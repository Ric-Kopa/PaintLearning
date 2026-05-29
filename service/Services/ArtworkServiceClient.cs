using System.Net.Http.Json;
using PaintLearning.Service.DTO;

namespace PaintLearning.Service.Services;

public class ArtworkServiceClient : IArtworkServiceClient
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;

    public ArtworkServiceClient(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _baseUrl = configuration["BackendApiUrl"] ?? "http://localhost:8080/api";
    }

    public async Task<ApiResponse<List<ArtworkDTO>>> GetAllArtworksAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<ApiResponse<List<ArtworkDTO>>>(
            $"{_baseUrl}/artworks");
        return response!;
    }

    public async Task<ApiResponse<ArtworkDTO>> GetArtworkByIdAsync(string id)
    {
        var response = await _httpClient.GetFromJsonAsync<ApiResponse<ArtworkDTO>>(
            $"{_baseUrl}/artworks/{id}");
        return response!;
    }

    public async Task<ApiResponse<ArtworkDTO>> CreateArtworkAsync(ArtworkCreateRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/artworks", request);
        return await response.Content.ReadFromJsonAsync<ApiResponse<ArtworkDTO>>()!;
    }

    public async Task<ApiResponse<ArtworkDTO>> UpdateArtworkAsync(string id, ArtworkCreateRequest request)
    {
        var response = await _httpClient.PutAsJsonAsync($"{_baseUrl}/artworks/{id}", request);
        return await response.Content.ReadFromJsonAsync<ApiResponse<ArtworkDTO>>()!;
    }

    public async Task<ApiResponse<object>> DeleteArtworkAsync(string id)
    {
        var response = await _httpClient.DeleteAsync($"{_baseUrl}/artworks/{id}");
        return await response.Content.ReadFromJsonAsync<ApiResponse<object>>()!;
    }

    public async Task<ApiResponse<ArtworkDTO>> ToggleFavoriteAsync(string id)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/artworks/{id}/favorite", new { });
        return await response.Content.ReadFromJsonAsync<ApiResponse<ArtworkDTO>>()!;
    }

    public async Task<ApiResponse<AnalysisResultDTO>> AnalyzeArtworkAsync(string id, AnalysisRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/artworks/{id}/analyze", request);
        return await response.Content.ReadFromJsonAsync<ApiResponse<AnalysisResultDTO>>()!;
    }

    public async Task<ApiResponse<TutorialDTO>> GenerateTutorialAsync(string id)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/artworks/{id}/tutorial", new { });
        return await response.Content.ReadFromJsonAsync<ApiResponse<TutorialDTO>>()!;
    }

    public async Task<ApiResponse<FeedbackDTO>> CreatePracticeAsync(PracticeRequest request)
    {
        var response = await _httpClient.PostAsJsonAsync($"{_baseUrl}/artworks/practice", request);
        return await response.Content.ReadFromJsonAsync<ApiResponse<FeedbackDTO>>()!;
    }

    public async Task<ApiResponse<AISettingsDTO>> GetAISettingsAsync()
    {
        var response = await _httpClient.GetFromJsonAsync<ApiResponse<AISettingsDTO>>(
            $"{_baseUrl}/ai-settings");
        return response!;
    }

    public async Task<ApiResponse<AISettingsDTO>> UpdateAISettingsAsync(AISettingsUpdateRequest request)
    {
        var response = await _httpClient.PutAsJsonAsync($"{_baseUrl}/ai-settings", request);
        return await response.Content.ReadFromJsonAsync<ApiResponse<AISettingsDTO>>()!;
    }
}