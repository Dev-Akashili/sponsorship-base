using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Constants;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models;

namespace SponsorshipBase.Services;

public class SponsorshipService(ApplicationDbContext db)
{
    public async Task<PaginatedResponse<SponsorshipModel>> List(
        string? filter, 
        int pageNumber, 
        int pageSize, 
        string option,
        ApplicationUser? user
        )
    {
        var entity = db.Sponsorships
            .Include(x => x.Company)
            .Include(x => x.JobBoard)
            .Include(x => x.Owner)
            .AsNoTracking();

        if (String.Equals(option, SponsorshipListOptions.UserList) && user != null)
        {
            entity = entity.Where(x => x.Owner.Id == user.Id);
        }
        
        // Filtering
        if (!string.IsNullOrWhiteSpace(filter))
        {
            filter = filter.Trim().ToLower();
            entity = entity.Where(x =>
                x.Company.Name.Trim().ToLower().Contains(filter) ||
                x.Country.Trim().ToLower().Contains(filter) ||
                x.City.Trim().ToLower().Contains(filter)
            );
        }
        
        var totalRecords = await entity.CountAsync();
        
        // Pagination
        var list = await entity
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var sponsorships = list.Select(x => new SponsorshipModel
        {
            Id = x.Id,
            Gender = x.Gender,
            Nationality = x.Nationality,
            Company = new CompanyModel
            {
                Name = x.Company.Name,
                Logo = x.Company.Logo,
                CareerPage = x.Company.CareerPage
            },
            Country = x.Country,
            City = x.City,
            JobTitle = x.JobTitle,
            Experience = x.Experience,
            Salary = x.Salary,
            Currency = x.Currency,
            Education = x.Education,
            CountryOfQualification = x.CountryOfQualification,
            Month = x.Month,
            Year = x.Year,
            JobBoard = new JobBoardModel
            {
                Name = x.JobBoard.Name,
                Link = x.JobBoard.Link
            },
            IsOwner = user?.Id == x.Owner.Id
        }).ToList();
            
        var result = new PaginatedResponse<SponsorshipModel>
        {
            Count = totalRecords,
            List = sponsorships,
        };

        return result;
    }
    
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
            Education = model.Education,
            CountryOfQualification = model.CountryOfQualification,
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