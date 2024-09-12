using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SponsorshipBase.Constants;
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
    
    [HttpGet]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> List(
        [FromQuery] string? filter, 
        int pageNumber = 1, 
        int pageSize = 1
        )
    {
        var user = await _userManager.GetUserAsync(User);
        var result = await _sponsorshipService.List(filter, pageNumber, pageSize, "", user ?? null);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("manage")]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> GetUserSponsorships(
        [FromQuery] string? filter, 
        int pageNumber = 1, 
        int pageSize = 1
    )
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(ErrorMessages.UserNotFound, ErrorMessages.UserError);
            }

            var result = await _sponsorshipService
                .List(filter, pageNumber, pageSize, SponsorshipListOptions.UserList, user);
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }
    
    [Authorize]
    [HttpGet("favourite")]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> GetUserFavouriteSponsorships(
        [FromQuery] string? filter, 
        int pageNumber = 1, 
        int pageSize = 1
    )
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(ErrorMessages.UserNotFound, ErrorMessages.UserError);
            }

            var result = await _sponsorshipService
                .List(filter, pageNumber, pageSize, SponsorshipListOptions.FavouriteList, user);
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
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
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while creating sponsorship"
                );
            }

            var created = await _sponsorshipService.Create(model, user);
            return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [Authorize]
    [HttpPost("favourite/{id}")]
    public async Task<ActionResult> AddFavourite(string id)
    {
        try
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while adding favorite"
                );
            }

            await _sponsorshipService.AddOrRemoveFavourite(user, id, "add");
            return NoContent();
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }
    
    [Authorize]
    [HttpDelete("favourite/{id}")]
    public async Task<ActionResult> RemoveFavourite(string id)
    {
        try
        { 
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while removing favourite"
                );
            }

            await _sponsorshipService.AddOrRemoveFavourite(user, id, "remove");
            return Ok();
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }
    
    // Helper methods
    private ActionResult HandleUserError(string message, string error)
    {
        _logger.LogWarning(message);
        return NotFound(new { error = error });
    }
    
    private ActionResult HandleException(Exception e, string message)
    {
        _logger.LogError(e, "Error: {Message}", e.Message);
        return StatusCode(500, new { error = message });
    }
}