using Microsoft.AspNetCore.Mvc;
using PaintLearning.Service.DTO;
using PaintLearning.Service.Services;

namespace PaintLearning.Service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AISettingsController : ControllerBase
{
    private readonly IArtworkServiceClient _artworkServiceClient;

    public AISettingsController(IArtworkServiceClient artworkServiceClient)
    {
        _artworkServiceClient = artworkServiceClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var result = await _artworkServiceClient.GetAISettingsAsync();
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSettings([FromBody] AISettingsUpdateRequest request)
    {
        var result = await _artworkServiceClient.UpdateAISettingsAsync(request);
        return Ok(result);
    }
}