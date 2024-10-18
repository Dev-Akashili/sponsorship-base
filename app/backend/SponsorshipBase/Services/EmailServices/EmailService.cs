using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities.Emails;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models.Email;
using SponsorshipBase.Services.Contracts;

namespace SponsorshipBase.Services.EmailServices;

public class EmailService : IEmailService
{
    private readonly HttpClient _client = new ();
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _config;

    public EmailService(ApplicationDbContext db, UserManager<ApplicationUser> userManager, IConfiguration config)
    {
        _db = db;
        _userManager = userManager;
        _config = config;
    }

    public async Task SendEmailVerificationLink(string emailAddress, string name)
    {
        var code = await GenerateVerificationCode();
        
        // Get EmailJS Credentials from config
        var serviceId = _config["EmailJS:SBServiceId"] ?? throw new KeyNotFoundException("Service Id not valid");
        var registerTemplateId = _config["EmailJS:RegisterTemplateId"] ?? throw new KeyNotFoundException("Template Id not valid");
        var resetTemplateId = _config["EmailJS:ResetTemplateId"] ?? throw new KeyNotFoundException("Template Id not valid");
        var key = _config["EmailJS:SBKey"] ?? throw new KeyNotFoundException("Private Id not valid");
        
        var email = new
        {
            service_id = serviceId,
            template_id = name.Equals("register") ? registerTemplateId : resetTemplateId,
            user_id = key,
            template_params = new
            {
                email = emailAddress,
                codeId = code.CodeId,
                code = code.Value,
            }
        };

        HttpResponseMessage response = await _client.PostAsJsonAsync("https://api.emailjs.com/api/v1.0/email/send", email);

        response.EnsureSuccessStatusCode();
    }

    public async Task SendCreatedEmail(
        string id,
        string email, 
        string sex,
        string nationality,
        string company,
        string country,
        string city,
        string jobTitle
    )
    {
        // Get EmailJS Credentials from config
        var serviceId = _config["EmailJS:CHServiceId"] ?? throw new KeyNotFoundException("Service Id not valid");
        var createdTemplateId = _config["EmailJS:CreatedTemplateId"] ?? throw new KeyNotFoundException("Template Id not valid");
        var key = _config["EmailJS:CHKey"] ?? throw new KeyNotFoundException("Private Id not valid");

        var newEmail = new
        {
            service_id = serviceId,
            template_id = createdTemplateId,
            user_id = key,
            template_params = new
            {
                id,
                email,
                sex,
                nationality,
                company,
                country,
                city,
                jobTitle
            }
        };
        
        await _client.PostAsJsonAsync("https://api.emailjs.com/api/v1.0/email/send", newEmail);
    }
    
    public async Task SendEditedEmail(
        string id,
        string email, 
        string sex,
        string nationality,
        string company,
        string country,
        string city,
        string oldJobTitle,
        string newJobTitle,
        string oldIndustry,
        string newIndustry,
        string oldExperience,
        string newExperience,
        string oldMonth,
        string newMonth,
        string oldYear,
        string newYear
    )
    {
        // Get EmailJS Credentials from config
        var serviceId = _config["EmailJS:CHServiceId"] ?? throw new KeyNotFoundException("Service Id not valid");
        var createdTemplateId = _config["EmailJS:EditedTemplateId"] ?? throw new KeyNotFoundException("Template Id not valid");
        var key = _config["EmailJS:CHKey"] ?? throw new KeyNotFoundException("Private Id not valid");

        var newEmail = new
        {
            service_id = serviceId,
            template_id = createdTemplateId,
            user_id = key,
            template_params = new
            {
                id,
                email,
                sex,
                nationality,
                company,
                country,
                city,
                oldJobTitle,
                newJobTitle,
                oldIndustry,
                newIndustry,
                oldExperience,
                newExperience,
                oldMonth,
                newMonth,
                oldYear,
                newYear
            }
        };
        
        await _client.PostAsJsonAsync("https://api.emailjs.com/api/v1.0/email/send", newEmail);
    }

    private async Task<VerificationCode> GenerateVerificationCode()
    {
        Random random = new Random();
        string[] code = new string[6];
        for (int i = 0; i < 6; i++)
        {
            code[i] = random.Next(0, 10).ToString();
        }
        var codeId = random.Next(0, 1001);
        var result = new VerificationCode
        {
            CodeId = codeId,
            Value = string.Join("", code)
        };

        _db.VerificationCodes.Add(result);
        await _db.SaveChangesAsync();
        
        return result;
    }
    
    public async Task<string> ValidateCode(ValidateEmailModel model, bool reset)
    {
        // Clear out all expired codes
        await RemoveExpiredCodes();
        
        var verificationCode = await _db.VerificationCodes.FirstOrDefaultAsync(x => x.CodeId == model.CodeId);
        
        if (verificationCode == null) return "expired";

        // Check if code is valid
        if (model.Code != verificationCode.Value) return "This code is not valid!";
        
        // Check if code has expired
        var expiry = reset ? 5 : 3;
        if (model.CurrentTime >= verificationCode.TimeSent.AddMinutes(expiry)) return "expired";
        
        // If code is valid, validate email
        if (!reset)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) throw new KeyNotFoundException("Something went wrong");
            var emailConfirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            await _userManager.ConfirmEmailAsync(user, emailConfirmationToken);
            _db.VerificationCodes.Remove(verificationCode);
            await _db.SaveChangesAsync();
        }

        return "success";
    }

    private async Task RemoveExpiredCodes()
    {
        const int expired = 5;
        var currentTime = DateTime.UtcNow;

        var expiredCodes = await _db.VerificationCodes
            .Where(x => currentTime >= x.TimeSent.AddMinutes(expired))
            .ToListAsync();

        if (expiredCodes.Count > 0)
        {
            _db.RemoveRange(expiredCodes);
            await _db.SaveChangesAsync();
        }
    }
}