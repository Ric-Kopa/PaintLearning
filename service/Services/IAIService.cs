using PaintLearning.Service.DTO;

namespace PaintLearning.Service.Services;

public interface IAIService
{
    Task<AnalysisResultDTO> AnalyzeArtworkAsync(string imageBase64, string language = "zh");
    Task<TutorialDTO> GenerateTutorialAsync(AnalysisResultDTO analysis, string language = "zh");
    Task<FeedbackDTO> ComparePracticeAsync(string originalImageBase64, string practiceImageBase64, string language = "zh");
}