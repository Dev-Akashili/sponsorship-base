using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SponsorshipBase.Constants;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models.User;
using SponsorshipBase.Services;

namespace SponsorshipBase.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class UserController(
    UserService userService,
    UserManager<ApplicationUser> userManager,
    ILogger<SponsorshipController> logger
) : ControllerBase
{ 
    [HttpGet]
    public async Task<ActionResult<UserModel>> GetUser()
    {
        var user = await userManager.GetUserAsync(User);
        if (user == null) return Unauthorized();

        var list = await userManager.GetRolesAsync(user);
        var roles = list.ToList();

        return Ok(new UserModel
        {
            Email = user.Email,
            Roles = roles
        });
    }

    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> Delete()
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null) return NotFound(ErrorMessages.UserNotFound);

            var result = await userService.Delete(user);
            if (result.Succeeded) return Ok();
            return StatusCode(500, new { error = ErrorMessages.Default });
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error: {Message}", e.Message);
            return StatusCode(500, new { error = ErrorMessages.Default });
        }
    }
}
