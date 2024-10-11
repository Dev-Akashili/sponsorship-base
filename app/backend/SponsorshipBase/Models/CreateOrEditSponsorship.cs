using SponsorshipBase.Data.Entities;

namespace SponsorshipBase.Models;

public class CreateOrEditSponsorship
{
    public string Company { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string Experience { get; set; } = string.Empty;
    public string Salary { get; set; } = string.Empty;
    public string Currency { get; set; } = string.Empty;
    public string Education { get; set; } = string.Empty;
    public string CountryOfQualification { get; set; } = string.Empty;
    public string Month { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string JobBoard { get; set; } = string.Empty;
    public string NewJobBoardName { get; set; } = string.Empty;
    public string NewJobBoardLink { get; set; } = string.Empty;
    public string CompanyCareerPage { get; set; } = string.Empty;
}