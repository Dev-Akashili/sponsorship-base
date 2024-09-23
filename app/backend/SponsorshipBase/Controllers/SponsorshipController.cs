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
public class SponsorshipController(
    SponsorshipService sponsorshipService,
    UserManager<ApplicationUser> userManager,
    ILogger<SponsorshipController> logger
) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> List(
        [FromQuery] string? filter, 
        [FromQuery] string? sortBy = null,
        [FromQuery] string? order = "asc",
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10
    )
    {
        var user = await userManager.GetUserAsync(User);
        var result = await sponsorshipService.List(
            filter,
            pageNumber, 
            pageSize, 
            "",
            user ?? null,
            sortBy,
            order
        );
        return Ok(result);
    }

    [Authorize]
    [HttpGet("manage")]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> GetUserSponsorships(
        [FromQuery] string? filter, 
        [FromQuery] string? sortBy = null,
        [FromQuery] string? order = "asc",
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 1
    )
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(ErrorMessages.UserNotFound, ErrorMessages.UserError);
            }

            var result = await sponsorshipService
                .List(
                    filter,
                    pageNumber, 
                    pageSize, 
                    SponsorshipListOptions.UserList,
                    user ?? null,
                    sortBy,
                    order
                );
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Sponsorship>> Get(string id)
    {
        var result = await sponsorshipService.Get(id);
        return result == null ? NotFound() : Ok(result);
    }
    
    [Authorize]
    [HttpGet("favourite")]
    public async Task<ActionResult<PaginatedResponse<SponsorshipModel>>> GetUserFavouriteSponsorships(
        [FromQuery] string? filter, 
        [FromQuery] string? sortBy = null,
        [FromQuery] string? order = "asc",
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 1
    )
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(ErrorMessages.UserNotFound, ErrorMessages.UserError);
            }

            var result = await sponsorshipService
                .List(
                    filter,
                    pageNumber, 
                    pageSize, 
                    SponsorshipListOptions.FavouriteList,
                    user ?? null,
                    sortBy,
                    order
                );
            
            return Ok(result);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Sponsorship>> Create(CreateOrEditSponsorship model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while creating sponsorship"
                );
            }

            var created = await sponsorshipService.Create(model, user);
            return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [Authorize]
    [HttpPatch("{id}")]
    public async Task<ActionResult<Sponsorship>> Edit(string id, CreateOrEditSponsorship model)
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while deleting sponsorship"
                );
            }

            var result = await sponsorshipService.Edit(model, user, id);
            return CreatedAtAction(nameof(Edit), new { id = result.Id }, result);
        }
        catch (KeyNotFoundException e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        try
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while deleting sponsorship"
                );
            }

            var result = await sponsorshipService.Delete(user, id);
            if (!result) return Unauthorized();
            return Ok();
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
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while adding favorite"
                );
            }

            await sponsorshipService.AddOrRemoveFavourite(user, id, "add");
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
            var user = await userManager.GetUserAsync(User);
            if (user == null)
            {
                return HandleUserError(
                    ErrorMessages.UserNotFound,
                    $"{ErrorMessages.UserError} while removing favourite"
                );
            }

            await sponsorshipService.AddOrRemoveFavourite(user, id, "remove");
            return Ok();
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }

    [Authorize(Policy = "RequireAdmin")]
    [HttpPatch("approve/{id}")]
    public async Task<ActionResult> ApproveOrDisable(string id)
    {
        try
        {
            await sponsorshipService.ApproveOrDisable(id);
            return Ok();
        }
        catch (KeyNotFoundException e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
        catch (Exception e)
        {
            return HandleException(e, ErrorMessages.Default);
        }
    }
    
    // Helper methods
    private ActionResult HandleUserError(string message, string error)
    {
        logger.LogWarning(message);
        return NotFound(new { error = error });
    }
    
    private ActionResult HandleException(Exception e, string message)
    {
        logger.LogError(e, "Error: {Message}", e.Message);
        return StatusCode(500, new { error = message });
    }
}