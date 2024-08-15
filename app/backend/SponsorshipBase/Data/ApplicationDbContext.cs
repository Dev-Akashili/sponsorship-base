using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Data.Entities.Emails;
using SponsorshipBase.Data.Entities.Identity;

namespace SponsorshipBase.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options) { }
    
    public DbSet<VerificationCode> VerificationCodes => Set<VerificationCode>();
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
    }
}