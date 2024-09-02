using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Data.Entities;

namespace SponsorshipBase.Data;

public class DataSeeder(ApplicationDbContext db)
{
    public async Task SeedJobBoards()
    {
        if (!await db.JobBoards
                .AsNoTracking()
                .AnyAsync()
           )
        {
            var jobBoards = new List<JobBoard>
            {
                new JobBoard
                {
                    Name = "Linkedin",
                    Link = "https://linkedin.com"
                },
                new JobBoard
                {
                    Name = "Indeed",
                    Link = "https://indeed.com"
                }
            };

            foreach (var jobBoard in jobBoards)
            {
                db.JobBoards.Add(jobBoard);
            }

            await db.SaveChangesAsync();
        }
    }
}