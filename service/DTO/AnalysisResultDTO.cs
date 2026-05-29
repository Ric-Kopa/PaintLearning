namespace PaintLearning.Service.DTO;

public class AnalysisResultDTO
{
    public string Id { get; set; } = string.Empty;
    public CompositionAnalysisDTO? Composition { get; set; }
    public ColorAnalysisDTO? Color { get; set; }
    public TechniqueAnalysisDTO? Technique { get; set; }
    public StyleAnalysisDTO? Style { get; set; }
    public LightShadowAnalysisDTO? LightShadow { get; set; }
    public string OverallSummary { get; set; } = string.Empty;
}

public class CompositionAnalysisDTO
{
    public string LayoutType { get; set; } = string.Empty;
    public string FocalPoint { get; set; } = string.Empty;
    public string SpatialHierarchy { get; set; } = string.Empty;
    public string NegativeSpace { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
}

public class ColorAnalysisDTO
{
    public List<string> PrimaryColors { get; set; } = new List<string>();
    public string SchemeType { get; set; } = string.Empty;
    public string Temperature { get; set; } = string.Empty;
    public string Saturation { get; set; } = string.Empty;
    public string Emotion { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
}

public class TechniqueAnalysisDTO
{
    public string Medium { get; set; } = string.Empty;
    public string BrushStroke { get; set; } = string.Empty;
    public string Texture { get; set; } = string.Empty;
    public List<string> SpecialTechniques { get; set; } = new List<string>();
    public string Details { get; set; } = string.Empty;
}

public class StyleAnalysisDTO
{
    public string Genre { get; set; } = string.Empty;
    public string ArtistReference { get; set; } = string.Empty;
    public List<string> Characteristics { get; set; } = new List<string>();
    public string Details { get; set; } = string.Empty;
}

public class LightShadowAnalysisDTO
{
    public string LightDirection { get; set; } = string.Empty;
    public string Contrast { get; set; } = string.Empty;
    public string Volume { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
}