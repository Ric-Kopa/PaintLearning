using Microsoft.AspNetCore.Mvc;
using PaintLearning.Service.DTO;
using PaintLearning.Service.Services;

namespace PaintLearning.Service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArtworkController : ControllerBase
{
    private readonly IAIService _aiService;
    private readonly IArtworkServiceClient _artworkServiceClient;

    public ArtworkController(IAIService aiService, IArtworkServiceClient artworkServiceClient)
    {
        _aiService = aiService;
        _artworkServiceClient = artworkServiceClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllArtworks()
    {
        var result = await _artworkServiceClient.GetAllArtworksAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArtworkById(string id)
    {
        var result = await _artworkServiceClient.GetArtworkByIdAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateArtwork([FromBody] ArtworkCreateRequest request)
    {
        var result = await _artworkServiceClient.CreateArtworkAsync(request);
        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArtwork(string id, [FromBody] ArtworkCreateRequest request)
    {
        var result = await _artworkServiceClient.UpdateArtworkAsync(id, request);
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArtwork(string id)
    {
        var result = await _artworkServiceClient.DeleteArtworkAsync(id);
        return Ok(result);
    }

    [HttpPost("{id}/favorite")]
    public async Task<IActionResult> ToggleFavorite(string id)
    {
        var result = await _artworkServiceClient.ToggleFavoriteAsync(id);
        return Ok(result);
    }

    [HttpPost("{id}/analyze")]
    public async Task<IActionResult> AnalyzeArtwork(string id, [FromBody] AnalysisRequest request)
    {
        var analysis = await _aiService.AnalyzeArtworkAsync(request.ImageBase64, request.Language);
        await _artworkServiceClient.AnalyzeArtworkAsync(id, request);
        return Ok(new ApiResponse<AnalysisResultDTO> { Code = 0, Message = "分析成功", Data = analysis });
    }

    [HttpPost("{id}/tutorial")]
    public async Task<IActionResult> GenerateTutorial(string id)
    {
        var artwork = await _artworkServiceClient.GetArtworkByIdAsync(id);
        if (artwork.Data?.Analysis == null)
        {
            return BadRequest(new ApiResponse<object> { Code = -1, Message = "请先分析画作" });
        }
        
        var tutorial = await _aiService.GenerateTutorialAsync(artwork.Data.Analysis);
        await _artworkServiceClient.GenerateTutorialAsync(id);
        return Ok(new ApiResponse<TutorialDTO> { Code = 0, Message = "教程生成成功", Data = tutorial });
    }

    [HttpPost("practice")]
    public async Task<IActionResult> CreatePractice([FromBody] PracticeRequest request)
    {
        var artwork = await _artworkServiceClient.GetArtworkByIdAsync(request.ArtworkId);
        if (artwork.Data?.ImageUri == null)
        {
            return BadRequest(new ApiResponse<object> { Code = -1, Message = "画作不存在" });
        }
        
        var feedback = await _aiService.ComparePracticeAsync(artwork.Data.ImageUri, request.PracticeImageBase64, request.Language);
        await _artworkServiceClient.CreatePracticeAsync(request);
        return Ok(new ApiResponse<FeedbackDTO> { Code = 0, Message = "练习反馈生成成功", Data = feedback });
    }
}