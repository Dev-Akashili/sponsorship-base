namespace SponsorshipBase.Models.User;

public class UserModel
{
    public string Email { get; set; } = string.Empty;
    public List<string> Roles { get; set; } = new();
}