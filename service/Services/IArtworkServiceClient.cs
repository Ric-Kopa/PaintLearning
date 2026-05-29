using PaintLearning.Service.DTO;

namespace PaintLearning.Service.Services;

public interface IArtworkServiceClient
{
    Task<ApiResponse<List<ArtworkDTO>>> GetAllArtworksAsync();
    Task<ApiResponse<ArtworkDTO>> GetArtworkByIdAsync(string id);
    Task<ApiResponse<ArtworkDTO>> CreateArtworkAsync(ArtworkCreateRequest request);
    Task<ApiResponse<ArtworkDTO>> UpdateArtworkAsync(string id, ArtworkCreateRequest request);
    Task<ApiResponse<object>> DeleteArtworkAsync(string id);
    Task<ApiResponse<ArtworkDTO>> ToggleFavoriteAsync(string id);
    Task<ApiResponse<AnalysisResultDTO>> AnalyzeArtworkAsync(string id, AnalysisRequest request);
    Task<ApiResponse<TutorialDTO>> GenerateTutorialAsync(string id);
    Task<ApiResponse<FeedbackDTO>> CreatePracticeAsync(PracticeRequest request);
    Task<ApiResponse<AISettingsDTO>> GetAISettingsAsync();
    Task<ApiResponse<AISettingsDTO>> UpdateAISettingsAsync(AISettingsUpdateRequest request);
}