using Microsoft.AspNetCore.Identity;

namespace SponsorshipBase.Data.Entities.Identity;

public class ApplicationUser : IdentityUser
{
    public string Sex { get; set; } = string.Empty;
    public string Nationality { get; set; } = string.Empty;
}