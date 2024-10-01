using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SponsorshipBase.Data.Entities.Identity;

namespace SponsorshipBase.Data.Entities;

public class Sponsorship
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Sex { get; set; } = string.Empty;
    public string Nationality { get; set; } = string.Empty;
    public Company Company { get; set; } = new();
    public string Country { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string JobTitle { get; set; } = string.Empty;
    public string Experience { get; set; } = string.Empty;
    public string Salary { get; set; } = string.Empty;
    public int MinimumSalary { get; set; }
    public string Currency { get; set; } = string.Empty;
    public string Education { get; set; } = string.Empty;
    public string CountryOfQualification { get; set; } = string.Empty;
    public string Month { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public JobBoard JobBoard { get; set; } = new();
    public List<string>? Favourites { get; set; } = new();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    public bool IsApproved { get; set; }
    public ApplicationUser Owner { get; set; } = null!;
}