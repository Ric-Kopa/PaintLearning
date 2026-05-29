namespace PaintLearning.Service.DTO;

public class TutorialDTO
{
    public string Id { get; set; } = string.Empty;
    public List<TutorialStepDTO> Steps { get; set; } = new List<TutorialStepDTO>();
    public List<string> Materials { get; set; } = new List<string>();
    public List<string> Tips { get; set; } = new List<string>();
}

public class TutorialStepDTO
{
    public int Order { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> KeyPoints { get; set; } = new List<string>();
    public string? RegionHint { get; set; }
}