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
                },
                new JobBoard
                {
                    Name = "Reed",
                    Link = "https://www.reed.co.uk"
                },
                new JobBoard
                {
                    Name = "Xing",
                    Link = "https://xing.com"
                },
                new JobBoard
                {
                    Name = "Company",
                    Link = ""
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