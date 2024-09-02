using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models;

namespace SponsorshipBase.Services;

public class SponsorshipService(ApplicationDbContext db)
{
    public async Task<Sponsorship> Create(CreateSponsorship model, ApplicationUser user)
    {
        var jobBoard = await db.JobBoards
            .FirstOrDefaultAsync(x => x.Name == model.JobBoard);

        if (jobBoard == null)
        {
            if (model.JobBoard == "Other")
            {
                jobBoard = new JobBoard
                {
                    Name = model.NewJobBoardName,
                    Link = model.NewJobBoardLink
                };
                db.JobBoards.Add(jobBoard);
            }
            else
            {
                jobBoard = await db.JobBoards
                    .FirstOrDefaultAsync(x => x.Name == "Company");
            }
        }

        var company = await db.Companies
            .Where(x => EF.Functions.ILike(x.Name, model.Company))
            .FirstOrDefaultAsync();

        if (company == null)
        {
            company = new Company { Name = model.Company };
            db.Companies.Add(company);
        }

        var entity = new Sponsorship
        {
            Gender = user.Gender,
            Nationality = user.Nationality,
            Company = company,
            Country = model.Country,
            City = model.City,
            JobTitle = model.JobTitle,
            Experience = model.Experience,
            Salary = model.Salary,
            Currency = model.Currency,
            Month = model.Month,
            Year = model.Year,
            JobBoard = jobBoard ?? new(),
            Owner = user
        };

        db.Sponsorships.Add(entity);
        await db.SaveChangesAsync();
        return entity;
    }
}