using SponsorshipBase.Data.Entities;

namespace SponsorshipBase.Models;

public class SponsorshipModel
{
    public string Id { get; set; } = string.Empty;
    public string Sex { get; set; } = string.Empty;
    public string Nationality { get; set; } = string.Empty;
    public CompanyModel Company { get; set; } = new();
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
    public JobBoardModel JobBoard { get; set; } = new();
    public bool IsOwner { get; set; } = false;
    public bool IsFavourite { get; set; } = false;
    public int FavouriteCount { get; set; }
    public List<string>? Reports { get; set; } = new();
    public bool IsApproved { get; set; } = false;
    public DateTime CreatedAt { get; set; }
}