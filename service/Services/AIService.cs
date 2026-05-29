using Newtonsoft.Json;
using PaintLearning.Service.DTO;

namespace PaintLearning.Service.Services;

public class AIService : IAIService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public AIService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<AnalysisResultDTO> AnalyzeArtworkAsync(string imageBase64, string language = "zh")
    {
        return await CreateMockAnalysisAsync();
    }

    public async Task<TutorialDTO> GenerateTutorialAsync(AnalysisResultDTO analysis, string language = "zh")
    {
        return await CreateMockTutorialAsync();
    }

    public async Task<FeedbackDTO> ComparePracticeAsync(string originalImageBase64, string practiceImageBase64, string language = "zh")
    {
        return await CreateMockFeedbackAsync();
    }

    private async Task<AnalysisResultDTO> CreateMockAnalysisAsync()
    {
        await Task.Delay(500);
        
        return new AnalysisResultDTO
        {
            Id = Guid.NewGuid().ToString(),
            Composition = new CompositionAnalysisDTO
            {
                LayoutType = "三分法",
                FocalPoint = "画面中心偏右",
                SpatialHierarchy = "前景、中景、背景层次分明",
                NegativeSpace = "留白恰到好处",
                Details = "整体构图稳定，视觉引导自然"
            },
            Color = new ColorAnalysisDTO
            {
                PrimaryColors = new List<string> { "#FF6B6B", "#4ECDC4", "#45B7D1" },
                SchemeType = "互补色搭配",
                Temperature = "偏暖",
                Saturation = "中等偏高",
                Emotion = "温暖、活力",
                Details = "色彩搭配和谐，富有层次感"
            },
            Technique = new TechniqueAnalysisDTO
            {
                Medium = "油画",
                BrushStroke = "明显的笔触纹理",
                Texture = "厚重的颜料堆叠",
                SpecialTechniques = new List<string> { "厚涂法", "干笔技法" },
                Details = "技法熟练，表现力强"
            },
            Style = new StyleAnalysisDTO
            {
                Genre = "印象派",
                ArtistReference = "莫奈风格",
                Characteristics = new List<string> { "色彩鲜艳", "光影变化", "笔触灵动" },
                Details = "具有典型的印象派特征"
            },
            LightShadow = new LightShadowAnalysisDTO
            {
                LightDirection = "右上方",
                Contrast = "中等对比",
                Volume = "立体感强",
                Details = "光影处理得当，增强了画面深度"
            },
            OverallSummary = "这是一幅优秀的印象派风格油画作品，构图合理，色彩搭配和谐，技法娴熟。"
        };
    }

    private async Task<TutorialDTO> CreateMockTutorialAsync()
    {
        await Task.Delay(500);
        
        return new TutorialDTO
        {
            Id = Guid.NewGuid().ToString(),
            Steps = new List<TutorialStepDTO>
            {
                new TutorialStepDTO
                {
                    Order = 1,
                    Title = "准备阶段",
                    Description = "准备画布、颜料和画笔等工具材料",
                    KeyPoints = new List<string> { "选择合适的画布尺寸", "准备基本颜色" }
                },
                new TutorialStepDTO
                {
                    Order = 2,
                    Title = "起稿",
                    Description = "用铅笔勾勒大致轮廓",
                    KeyPoints = new List<string> { "注意构图比例", "确定主体位置" }
                },
                new TutorialStepDTO
                {
                    Order = 3,
                    Title = "铺大色块",
                    Description = "铺设背景和主体的基本色调",
                    KeyPoints = new List<string> { "从大面积开始", "注意色彩层次" }
                },
                new TutorialStepDTO
                {
                    Order = 4,
                    Title = "深入刻画",
                    Description = "细化细节和光影",
                    KeyPoints = new List<string> { "注意明暗对比", "保持笔触方向" }
                },
                new TutorialStepDTO
                {
                    Order = 5,
                    Title = "调整统一",
                    Description = "整体调整画面效果",
                    KeyPoints = new List<string> { "检查整体色调", "调整细节" }
                }
            },
            Materials = new List<string> { "油画布", "油画颜料", "画笔", "调色板" },
            Tips = new List<string> { "保持调色板清洁", "注意颜料厚度", "多观察实物" }
        };
    }

    private async Task<FeedbackDTO> CreateMockFeedbackAsync()
    {
        await Task.Delay(500);
        
        return new FeedbackDTO
        {
            Id = Guid.NewGuid().ToString(),
            Strengths = new List<string> { "色彩把握较好", "构图合理", "笔触流畅" },
            Weaknesses = new List<string> { "明暗对比不够强烈", "细节处理有待提高" },
            Suggestions = new List<SuggestionDTO>
            {
                new SuggestionDTO
                {
                    Area = "光影",
                    Description = "加强明暗对比，增强立体感",
                    Priority = "high",
                    IsResolved = false
                },
                new SuggestionDTO
                {
                    Area = "细节",
                    Description = "注意细节刻画，提升画面精致度",
                    Priority = "medium",
                    IsResolved = false
                }
            },
            OverallRating = 4
        };
    }
}