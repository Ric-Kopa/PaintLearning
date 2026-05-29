namespace PaintLearning.Service.DTO;

public class ArtworkDTO
{
    public string Id { get; set; } = string.Empty;
    public string ImageUri { get; set; } = string.Empty;
    public string? ThumbnailUri { get; set; }
    public AnalysisResultDTO? Analysis { get; set; }
    public TutorialDTO? Tutorial { get; set; }
    public List<PracticeDTO> Practices { get; set; } = new List<PracticeDTO>();
    public DateTime CreatedAt { get; set; }
    public bool IsFavorite { get; set; }
    public List<string> Tags { get; set; } = new List<string>();
}

public class PracticeDTO
{
    public string Id { get; set; } = string.Empty;
    public string ImageUri { get; set; } = string.Empty;
    public FeedbackDTO? Feedback { get; set; }
    public List<string> CompletedImprovements { get; set; } = new List<string>();
    public DateTime CreatedAt { get; set; }
}