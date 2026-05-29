namespace PaintLearning.Service.DTO;

public class FeedbackDTO
{
    public string Id { get; set; } = string.Empty;
    public List<string> Strengths { get; set; } = new List<string>();
    public List<string> Weaknesses { get; set; } = new List<string>();
    public List<SuggestionDTO> Suggestions { get; set; } = new List<SuggestionDTO>();
    public int OverallRating { get; set; }
}

public class SuggestionDTO
{
    public string Area { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public bool IsResolved { get; set; }
}