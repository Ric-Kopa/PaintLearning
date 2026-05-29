namespace PaintLearning.Service.DTO;

public class ArtworkCreateRequest
{
    public string ImageUri { get; set; } = string.Empty;
    public string? ThumbnailUri { get; set; }
    public List<string>? Tags { get; set; }
}

public class AnalysisRequest
{
    public string ImageBase64 { get; set; } = string.Empty;
    public string Language { get; set; } = "zh";
}

public class PracticeRequest
{
    public string ArtworkId { get; set; } = string.Empty;
    public string PracticeImageBase64 { get; set; } = string.Empty;
    public string Language { get; set; } = "zh";
}

public class AISettingsDTO
{
    public string Id { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public string Language { get; set; } = string.Empty;
}

public class AISettingsUpdateRequest
{
    public string? Model { get; set; }
    public string? OpenaiKey { get; set; }
    public string? ClaudeKey { get; set; }
    public string? GeminiKey { get; set; }
    public string? Language { get; set; }
}