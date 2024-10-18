using SponsorshipBase.Models.Email;

namespace SponsorshipBase.Services.Contracts;

public interface IEmailService
{
    Task SendEmailVerificationLink(string to, string name);
    Task SendCreatedEmail(
        string id,
        string email,
        string sex,
        string nationality,
        string company,
        string country,
        string city,
        string jobTitle
    );
    Task SendEditedEmail(
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
    );
    Task<string> ValidateCode(ValidateEmailModel model, bool request);
}