using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SponsorshipBase.Data.Entities;
using SponsorshipBase.Data.Entities.Identity;
using SponsorshipBase.Models;
using SponsorshipBase.Services;

namespace SponsorshipBase.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class SponsorshipController : ControllerBase
{
    private readonly SponsorshipService _sponsorshipService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ILogger<SponsorshipController> _logger;

    public SponsorshipController(
        SponsorshipService sponsorshipService, 
        UserManager<ApplicationUser> userManager,
        ILogger<SponsorshipController> logger
        )
    {
        _sponsorshipService = sponsorshipService;
        _userManager = userManager;
        _logger = logger;
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Sponsorship>> Create(CreateSponsorship model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                _logger.LogWarning("User not found.");
                return StatusCode(500, new
                {
                    error = "User error occurred while creating sponsorship"
                });
            }
            var created = await _sponsorshipService.Create(model, user);
            
            return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "Error: {Message}", e.Message);
            return StatusCode(500, new
            {
                error = "An unexpected error occurred. Please try again later."
            });
        }
    }
}