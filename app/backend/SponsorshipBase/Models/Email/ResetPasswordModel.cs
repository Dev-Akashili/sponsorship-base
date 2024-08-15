namespace SponsorshipBase.Models.Email;

public class ResetPasswordModel : ValidateEmailModel
{
    public string NewPassword { get; set; } = string.Empty;
}