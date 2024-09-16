using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities.Identity;

namespace SponsorshipBase.Services;

public class UserService(
    ApplicationDbContext db,
    UserManager<ApplicationUser> userManager
)
{
    public async Task<IdentityResult> Delete(ApplicationUser user)
    {
        var sponsorships = db.Sponsorships
            .Include(x => x.Owner)
            .Where(x => x.Owner.Id == user.Id);

        var favourites = db.Sponsorships
            .Where(x => x.Favourites != null && x.Favourites.Contains(user.Id));
        
        // Remove sponsorship
        if (sponsorships.Any())
        {
            db.Sponsorships.RemoveRange(sponsorships);
        }
        
        // Remove from favourites
        foreach (var sponsorship in favourites)
        {
            if (sponsorship.Favourites != null && sponsorship.Favourites.Contains(user.Id))
            {
                sponsorship.Favourites.Remove(user.Id);
            }
        }

        await db.SaveChangesAsync();
        return await userManager.DeleteAsync(user);
    }
}