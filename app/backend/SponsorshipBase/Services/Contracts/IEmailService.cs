using SponsorshipBase.Models.Email;

namespace SponsorshipBase.Services.Contracts;

public interface IEmailService
{
    Task SendEmailVerificationLink(string to, string name);
    Task<string> ValidateCode(ValidateEmailModel model, bool request);
}