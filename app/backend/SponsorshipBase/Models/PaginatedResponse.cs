namespace SponsorshipBase.Models;

public class PaginatedResponse<T>
{
    public int Count { get; set; }
    public IEnumerable<T>? List { get; set; }
}