using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Constants;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models.Account;
using SponsorshipBase.Models.Email;
using SponsorshipBase.Services.Contracts;

namespace SponsorshipBase.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AccountController(
    UserManager<ApplicationUser> userManager, 
    ApplicationDbContext db, 
    IEmailService emailService,
    IConfiguration config
) : ControllerBase
{ 
    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null) return BadRequest(ErrorMessages.Default);

        // Add sex and nationality to user
        user.Sex = model.Sex;
        user.Nationality = model.Nationality;
        await userManager.UpdateAsync(user);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        
        // If the user does not exist
        if (user == null)
        {
            return Ok(new { Name = "error", Message = "Username or password is incorrect!" });
        }

        // If user exists check if problem is email is not confirmed or password is wrong
        var message = await userManager.CheckPasswordAsync(user, model.Password)
            ? user.EmailConfirmed 
                ? "Username or password is incorrect!"
                :  "Verify your email to login"
            : "Username or password is incorrect!";
        var name =  await userManager.CheckPasswordAsync(user, model.Password)
            ? user.EmailConfirmed ? "error" : "info"
            : "error";

        return Ok(new { Name = name, Message = message });
    }

    [HttpPost("sendEmailVerificationLink")]
    public async Task<IActionResult> SendEmailVerificationLink(string email, string name)
    {
        // Check if user exists
        var user = await userManager.FindByEmailAsync(email);
        if (user == null) return Ok();

        // If user exists but has already been confirmed
        if (user.EmailConfirmed && name.Equals("register")) return BadRequest("User Email is already confirmed");
        
        try
        { 
            await emailService.SendEmailVerificationLink(email, name);
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return BadRequest(ErrorMessages.Default);
        }
    }
    
    [HttpPost("verifyEmail")]
    public async Task<IActionResult> VerifyEmail(ValidateEmailModel model)
    {
        try
        {
            var message = await emailService.ValidateCode(model, false);
            
            // Assign role to user
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) return NotFound();
            
            if (message.Equals("success"))
            { 
                var roles = await userManager.GetRolesAsync(user); 
                
                // Role assigning rule
                var role = model.Email.Equals(config["Admin:Email"]) ? "Admin" : "User";
                
               // Add the role if the user doesn't already have it
               if (!roles.Contains(role)) await userManager.AddToRoleAsync(user, role);
               
               await  db.SaveChangesAsync();
            }

            if (!message.Equals("success"))
            {
                return BadRequest(message);
            }

            return Ok("Email successfully verified.");
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPost("resetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            var loggedIn = user != null;
            
            if (!loggedIn)
            {
                user = await userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return BadRequest(ErrorMessages.UserError);
                }

                var message = await emailService.ValidateCode(new ValidateEmailModel
                    {
                        Code = model.Code,
                        CodeId = model.CodeId,
                        Email = model.Email
                    }, true
                );

                if (!message.Equals("success")) return BadRequest(new { Name = "error", Message = message });
            }

            if (loggedIn)
            {
                if (string.IsNullOrEmpty(model.CurrentPassword))
                {
                    return BadRequest(
                        new { Name = "error", Message = "Invalid request. Current password is required." }
                    );
                }
                
                var isCurrentPasswordValid = await userManager.CheckPasswordAsync(user, model.CurrentPassword);
                if (!isCurrentPasswordValid)
                {
                    return BadRequest(new { Name = "error", Message = "Current password is incorrect." });
                }
            }
                
            // Reset Password
            var resetToken = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, resetToken, model.NewPassword);
            
            if (result.Succeeded)
            {
                if (!loggedIn)
                {
                    var verificationCode = await db.VerificationCodes
                                               .FirstOrDefaultAsync(x => x.CodeId == model.CodeId) ??
                                           throw new KeyNotFoundException(ErrorMessages.Default);
                    db.VerificationCodes.Remove(verificationCode);
                    await db.SaveChangesAsync();
                }

                return Ok("Password has been successfully reset.");
            }
            else
            {
                // If resetting the password failed, return error messages
                var errors = result.Errors.Select(error => error.Description).ToArray();
                return BadRequest(new { Name = "error", Message = errors });
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return BadRequest(ErrorMessages.Default);
        }
    }
}