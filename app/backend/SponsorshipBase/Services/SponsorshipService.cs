using System.Globalization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SponsorshipBase.Constants;
using SponsorshipBase.Data;
using SponsorshipBase.Data.Entities;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models;
using SponsorshipBase.Services.Contracts;

namespace SponsorshipBase.Services;

public class SponsorshipService(
    ApplicationDbContext db, 
    UserManager<ApplicationUser> userManager,
    IEmailService emailService
)
{
    public async Task<PaginatedResponse<SponsorshipModel>> List(
        string? filter,
        string? id,
        string? country,
        string? city,
        string? experience,
        string? industry,
        string? sex,
        int pageNumber,
        int pageSize,
        string option,
        ApplicationUser? user,
        string? sortBy,
        string? order,
        string? approval,
        string? reported
    )
    {
        var entity = db.Sponsorships
            .Include(x => x.Company)
            .Include(x => x.JobBoard)
            .Include(x => x.Owner)
            .AsNoTracking();
        
        var roles = user != null ? await userManager.GetRolesAsync(user) : new List<string>();

        // Apply IsApproved filter unless user is Admin or option is UserList
        if (!roles.Contains("Admin") && !String.Equals(option, SponsorshipListOptions.UserList))
        {
            entity = entity.Where(x => x.IsApproved);
        }

        if (String.Equals(option, SponsorshipListOptions.UserList) && user != null)
        {
            entity = entity.Where(x => x.Owner.Id == user.Id);
        }

        if (String.Equals(option, SponsorshipListOptions.FavouriteList) && user != null)
        {
            entity = entity.Where(x => x.Favourites != null && x.Favourites.Contains(user.Id));
        }
        
        // Admin Filter
        if (roles.Contains("Admin") && String.Equals(approval, "show"))
        {
            entity = entity.Where(x => !x.IsApproved);
        }
        
        if (roles.Contains("Admin") && String.Equals(reported, "show"))
        {
            entity = entity.Where(x => x.Reports != null && x.Reports.Count > 0);
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
        
        // Sorting
        if (!string.IsNullOrEmpty(sortBy))
        {
            switch (sortBy.ToLower())
            { 
                case "year": 
                    entity = order?.ToLower() == "desc"
                        ? entity.OrderByDescending(x => x.Year)
                        : entity.OrderBy(x => x.Year);
                    break;
                case "salary": 
                    entity = order?.ToLower() == "desc"
                        ? entity.OrderByDescending(x => x.MinimumSalary)
                        : entity.OrderBy(x => x.MinimumSalary);
                    break;
                case "date": 
                    entity = order?.ToLower() == "desc"
                        ? entity.OrderByDescending(x => x.LastUpdated)
                        : entity.OrderBy(x => x.LastUpdated);
                    break;
                default:
                    entity = entity.OrderByDescending(x => x.LastUpdated);
                    break;
            }
        }
        else
        {
           entity = entity.OrderByDescending(x => x.LastUpdated);
        }
        
        // Additional Filters
        if (!string.IsNullOrEmpty(id)) entity = entity.Where(x => String.Equals(x.Id.ToLower(), id));
        if (!string.IsNullOrEmpty(country)) entity = entity.Where(x => String.Equals(x.Country.ToLower(), country));
        if (!string.IsNullOrEmpty(city)) entity = entity.Where(x => String.Equals(x.City.ToLower(), city));
        if (!string.IsNullOrEmpty(experience)) entity = entity.Where(x => String.Equals(x.Experience.ToLower(), experience));
        if (!string.IsNullOrEmpty(industry)) entity = entity.Where(x => String.Equals(x.Industry.ToLower(), industry));
        if (!string.IsNullOrEmpty(sex)) entity = entity.Where(x => String.Equals(x.Sex.ToLower(), sex));

        var totalRecords = await entity.CountAsync();

        // Pagination
        var list = await entity
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var sponsorships = list.Select(x => new SponsorshipModel
        {
            Id = x.Id,
            Sex = x.Sex,
            Nationality = x.Nationality,
            Company = new CompanyModel
            {
                Name = x.Company.Name,
                CareerPage = x.Company.CareerPage
            },
            Country = x.Country,
            City = x.City,
            Industry = x.Industry,
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
            IsOwner = user?.Id == x.Owner.Id,
            IsFavourite = x.Favourites != null && x.Favourites.Contains(user?.Id ?? ""),
            FavouriteCount = x.Favourites?.Count ?? 0,
            Reports = roles.Contains("Admin") ? x.Reports : new(),
            IsApproved = x.IsApproved,
            CreatedAt = x.CreatedAt
        }).ToList();

        var result = new PaginatedResponse<SponsorshipModel>
        {
            Count = totalRecords,
            List = sponsorships,
        };

        return result;
    }

    public async Task<SponsorshipModel?> Get(string id)
    {
        var entity = await db.Sponsorships
            .Include(x => x.Company)
            .Include(x => x.JobBoard)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if (entity == null) return null;

        var sponsorship = new SponsorshipModel
        {
            Id = entity.Id,
            Sex = entity.Sex,
            Nationality = entity.Nationality,
            Company = new CompanyModel
            {
                Name = entity.Company.Name,
                CareerPage = entity.Company.CareerPage
            },
            Country = entity.Country,
            City = entity.City,
            Industry = entity.Industry,
            JobTitle = entity.JobTitle,
            Experience = entity.Experience,
            Salary = entity.Salary,
            Currency = entity.Currency,
            Education = entity.Education,
            CountryOfQualification = entity.CountryOfQualification,
            Month = entity.Month,
            Year = entity.Year,
            JobBoard = new JobBoardModel
            {
                Name = entity.JobBoard.Name,
                Link = entity.JobBoard.Link
            },
        };
        return sponsorship;
    }

    public async Task<Sponsorship> Create(CreateOrEditSponsorship model, ApplicationUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        
        var jobBoard = await db.JobBoards
            .FirstOrDefaultAsync(x => String.Equals(x.Name, model.JobBoard));

        if (jobBoard == null)
        {
            if (String.Equals(model.JobBoard, "Other"))
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
                    .FirstOrDefaultAsync(x => String.Equals(x.Name , "Company"));
            }
        }

        var company = await db.Companies
            .Where(x => EF.Functions.ILike(x.Name, model.Company))
            .FirstOrDefaultAsync();

        if (company == null)
        {
            company = new Company
            {
                Name = model.Company,
                CareerPage = model.CompanyCareerPage
            };
            db.Companies.Add(company);
        }

        var entity = new Sponsorship
        {
            Sex = user.Sex,
            Nationality = user.Nationality,
            Company = company,
            Country = model.Country,
            City = model.City,
            Industry = model.Industry,
            JobTitle = model.JobTitle,
            Experience = model.Experience,
            Salary = model.Salary,
            MinimumSalary = ConvertSalary(model.Salary),
            Currency = model.Currency,
            Education = model.Education,
            CountryOfQualification = model.CountryOfQualification,
            Month = model.Month,
            Year = model.Year,
            JobBoard = jobBoard ?? new(),
            Owner = user,
            Favourites = new(),
            IsApproved = roles.Contains("Admin"),
            Reports = new()
        };

        db.Sponsorships.Add(entity);
        await db.SaveChangesAsync();

        await emailService.SendCreatedEmail(
            entity.Id,
            user.Email ?? "",
            entity.Sex,
            entity.Nationality,
            entity.Company.Name,
            entity.Country,
            entity.City,
            entity.JobTitle
        );
        
        return entity;
    }

    public async Task<Sponsorship> Edit(CreateOrEditSponsorship model, ApplicationUser user, string id)
    { 
        var sponsorship = await db.Sponsorships
            .Include(x => x.Company)
            .Include(x => x.JobBoard)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (sponsorship == null) throw new KeyNotFoundException("Sponsorship not found");
        
        // Admin update
        var roles = await userManager.GetRolesAsync(user);
        
        if (roles.Contains("Admin"))
        {
            if (!String.Equals(model.Company, sponsorship.Company.Name))
            {
                var company = await db.Companies
                    .FirstOrDefaultAsync(x => String.Equals(x.Name, sponsorship.Company.Name));
                
                var updateCompany = await db.Companies
                    .FirstOrDefaultAsync(x => String.Equals(x.Name, model.Company));

                if (company == null) throw new KeyNotFoundException("Company not found");

                if (updateCompany == null)
                {
                    updateCompany = new Company
                    {
                        Name = model.Company,
                        CareerPage = model.NewJobBoardLink
                    };
                    sponsorship.Company = updateCompany;
                    db.Add(updateCompany);
                }
                else
                {
                    sponsorship.Company = updateCompany;
                }
                
                db.Companies.Remove(company);
            }
            
            if (!string.IsNullOrEmpty(model.CompanyCareerPage))
            {
                sponsorship.Company.CareerPage = model.CompanyCareerPage;
            }
            
            if (!String.Equals(model.JobBoard, sponsorship.JobBoard.Name))
            {
                var jobBoard = await db.JobBoards
                    .FirstOrDefaultAsync(x => String.Equals(x.Name, sponsorship.JobBoard.Name));

                var updateJobBoard = await db.JobBoards
                    .FirstOrDefaultAsync(x => String.Equals(x.Name, model.JobBoard));

                if (jobBoard == null)  throw new KeyNotFoundException("Job board not found");

                if (updateJobBoard == null)
                {
                    updateJobBoard = new JobBoard
                    {
                        Name = model.NewJobBoardName,
                        Link = model.NewJobBoardLink
                    };
                    sponsorship.JobBoard = updateJobBoard;
                    db.Add(updateJobBoard);
                }
                else
                {
                    sponsorship.JobBoard = updateJobBoard;

                    if (!string.IsNullOrEmpty(model.NewJobBoardLink))
                    {
                        sponsorship.JobBoard.Link = model.NewJobBoardLink;
                    }
                }
            }
        }
        
        if (!roles.Contains("Admin"))
        {
            await emailService.SendEditedEmail(
                sponsorship.Id,
                user.Email ?? "",
                sponsorship.Sex,
                sponsorship.Nationality,
                sponsorship.Company.Name,
                sponsorship.Country,
                sponsorship.City,
                sponsorship.JobTitle,
                model.JobTitle,
                sponsorship.Industry,
                model.Industry,
                sponsorship.Experience,
                model.Experience,
                sponsorship.Month,
                model.Month,
                sponsorship.Year,
                model.Year
            );
        }

        // User update
        sponsorship.Industry = model.Industry;
        sponsorship.MinimumSalary = ConvertSalary(sponsorship.Salary);
        sponsorship.JobTitle = model.JobTitle;
        sponsorship.Experience = model.Experience;
        sponsorship.Month = model.Month;
        sponsorship.Year = model.Year;
        sponsorship.LastUpdated = DateTime.UtcNow;
        sponsorship.IsApproved = sponsorship.IsApproved && roles.Contains("Admin");

        await db.SaveChangesAsync();
        return sponsorship;
    }

    public async Task<bool> Delete(ApplicationUser user, string id)
    {
        var sponsorship = await db.Sponsorships
            .Include(x => x.Owner)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        var roles = await userManager.GetRolesAsync(user);
        
        if (sponsorship != null && roles.Any())
        {
            if (sponsorship.Owner.Id == user.Id || roles.Contains("Admin"))
            {
                db.Sponsorships.Remove(sponsorship);
                await db.SaveChangesAsync();
                return true;
            }
        }
        return false;
    }
    
    public async Task AddOrRemoveFavourite(ApplicationUser user, string id, string options)
    {
        var sponsorship = await db.Sponsorships.FirstOrDefaultAsync(x => x.Id == id);

        if (sponsorship != null && sponsorship.Favourites != null)
        {
            if (!sponsorship.Favourites.Contains(user.Id)
                && (String.Equals(options, "add")) 
                && sponsorship.IsApproved
               )
            {
                sponsorship.Favourites.Add(user.Id);
            } 
            else if (sponsorship.Favourites.Contains(user.Id) && (String.Equals(options, "remove")))
            {
                sponsorship.Favourites.Remove(user.Id);
            }
        }

        await db.SaveChangesAsync();
    }

    public async Task ApproveOrDisable(string id)
    {
        var sponsorship = await db.Sponsorships.FirstOrDefaultAsync(x => x.Id == id);
        if (sponsorship == null)
        {
            throw new KeyNotFoundException("Sponsorship not found");
        }

        sponsorship.IsApproved = !sponsorship.IsApproved;
        
        if (sponsorship.Favourites != null)
        { 
            sponsorship.Favourites.Clear();
        }

        await db.SaveChangesAsync();
    }

    public async Task AddReport(string id, AddReportModel model)
    {
        var sponsorship = await db.Sponsorships.FirstOrDefaultAsync(x => x.Id == id);
        if (sponsorship == null)
        {
            throw new KeyNotFoundException("Sponsorship not found");
        }

        sponsorship.Reports?.Add(model.Message);
        sponsorship.IsApproved = sponsorship?.Reports?.Count() < 5;
        await db.SaveChangesAsync();
    }
    
    // Helper methods
    private static int ConvertSalary(string salaryRange)
    {
        salaryRange = salaryRange.Replace(" ", string.Empty);
        string[] parts = salaryRange.Split(new[] { '-', '–' }, StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length > 1)
        {
            salaryRange = parts[0];
        }
        else if (parts[0].EndsWith("+"))
        {
            salaryRange = parts[0].TrimEnd('+');
        }
        else
        {
            throw new FormatException("Invalid salary format.");
        }
        
        return int.Parse(salaryRange, NumberStyles.AllowThousands);
    }
}