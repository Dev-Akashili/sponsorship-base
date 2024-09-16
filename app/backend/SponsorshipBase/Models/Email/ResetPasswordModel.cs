namespace SponsorshipBase.Models.Email;

public class ResetPasswordModel : ValidateEmailModel
{
    public string? CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}