package com.paintlearning.app.service.impl;

import com.paintlearning.app.dto.request.AnalysisRequest;
import com.paintlearning.app.dto.request.PracticeRequest;
import com.paintlearning.app.dto.response.*;
import com.paintlearning.app.entity.*;
import com.paintlearning.app.repository.ArtworkRepository;
import com.paintlearning.app.service.ArtworkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ArtworkServiceImpl implements ArtworkService {

    @Autowired
    private ArtworkRepository artworkRepository;

    @Override
    @Transactional
    public ArtworkDTO createArtwork(String imageUri, String thumbnailUri, List<String> tags) {
        Artwork artwork = new Artwork();
        artwork.setId(UUID.randomUUID().toString());
        artwork.setImageUri(imageUri);
        artwork.setThumbnailUri(thumbnailUri);
        artwork.setTags(tags != null ? tags : new ArrayList<>());
        artwork.setCreatedAt(LocalDateTime.now());
        artwork.setIsFavorite(false);
        artwork.setPractices(new ArrayList<>());

        Artwork saved = artworkRepository.save(artwork);
        return toArtworkDTO(saved);
    }

    @Override
    public ArtworkDTO getArtworkById(String id) {
        Artwork artwork = artworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("画作不存在"));
        return toArtworkDTO(artwork);
    }

    @Override
    public List<ArtworkDTO> getAllArtworks() {
        return artworkRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ArtworkDTO> getFavoriteArtworks() {
        return artworkRepository.findByIsFavoriteTrue()
                .stream()
                .map(this::toArtworkDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ArtworkDTO updateArtwork(String id, String imageUri, String thumbnailUri, List<String> tags) {
        Artwork artwork = artworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("画作不存在"));
        
        if (imageUri != null) artwork.setImageUri(imageUri);
        if (thumbnailUri != null) artwork.setThumbnailUri(thumbnailUri);
        if (tags != null) artwork.setTags(tags);

        Artwork saved = artworkRepository.save(artwork);
        return toArtworkDTO(saved);
    }

    @Override
    @Transactional
    public void deleteArtwork(String id) {
        if (!artworkRepository.existsById(id)) {
            throw new RuntimeException("画作不存在");
        }
        artworkRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ArtworkDTO toggleFavorite(String id) {
        Artwork artwork = artworkRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("画作不存在"));
        artwork.setIsFavorite(!artwork.getIsFavorite());
        
        Artwork saved = artworkRepository.save(artwork);
        return toArtworkDTO(saved);
    }

    @Override
    @Transactional
    public AnalysisResultDTO analyzeArtwork(String artworkId, AnalysisRequest request) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new RuntimeException("画作不存在"));

        AnalysisResult analysis = createMockAnalysis();
        analysis.setId(UUID.randomUUID().toString());
        artwork.setAnalysis(analysis);

        artworkRepository.save(artwork);
        return toAnalysisResultDTO(analysis);
    }

    @Override
    @Transactional
    public TutorialDTO generateTutorial(String artworkId) {
        Artwork artwork = artworkRepository.findById(artworkId)
                .orElseThrow(() -> new RuntimeException("画作不存在"));

        if (artwork.getAnalysis() == null) {
            throw new RuntimeException("请先分析画作");
        }

        Tutorial tutorial = createMockTutorial();
        tutorial.setId(UUID.randomUUID().toString());
        artwork.setTutorial(tutorial);

        artworkRepository.save(artwork);
        return toTutorialDTO(tutorial);
    }

    @Override
    @Transactional
    public FeedbackDTO createPractice(PracticeRequest request) {
        Artwork artwork = artworkRepository.findById(request.getArtworkId())
                .orElseThrow(() -> new RuntimeException("画作不存在"));

        Feedback feedback = createMockFeedback();
        feedback.setId(UUID.randomUUID().toString());

        Practice practice = new Practice();
        practice.setId(UUID.randomUUID().toString());
        practice.setArtwork(artwork);
        practice.setImageUri("data:image/jpeg;base64," + request.getPracticeImageBase64());
        practice.setFeedback(feedback);
        practice.setCreatedAt(LocalDateTime.now());
        practice.setCompletedImprovements(new ArrayList<>());

        artwork.getPractices().add(practice);
        artworkRepository.save(artwork);

        return toFeedbackDTO(feedback);
    }

    private AnalysisResult createMockAnalysis() {
        AnalysisResult analysis = new AnalysisResult();
        
        CompositionAnalysis composition = new CompositionAnalysis();
        composition.setId(UUID.randomUUID().toString());
        composition.setLayoutType("三分法");
        composition.setFocalPoint("画面中心偏右");
        composition.setSpatialHierarchy("前景、中景、背景层次分明");
        composition.setNegativeSpace("留白恰到好处");
        composition.setDetails("整体构图稳定，视觉引导自然");
        analysis.setComposition(composition);

        ColorAnalysis color = new ColorAnalysis();
        color.setId(UUID.randomUUID().toString());
        color.setPrimaryColors(List.of("#FF6B6B", "#4ECDC4", "#45B7D1"));
        color.setSchemeType("互补色搭配");
        color.setTemperature("偏暖");
        color.setSaturation("中等偏高");
        color.setEmotion("温暖、活力");
        color.setDetails("色彩搭配和谐，富有层次感");
        analysis.setColor(color);

        TechniqueAnalysis technique = new TechniqueAnalysis();
        technique.setId(UUID.randomUUID().toString());
        technique.setMedium("油画");
        technique.setBrushStroke("明显的笔触纹理");
        technique.setTexture("厚重的颜料堆叠");
        technique.setSpecialTechniques(List.of("厚涂法", "干笔技法"));
        technique.setDetails("技法熟练，表现力强");
        analysis.setTechnique(technique);

        StyleAnalysis style = new StyleAnalysis();
        style.setId(UUID.randomUUID().toString());
        style.setGenre("印象派");
        style.setArtistReference("莫奈风格");
        style.setCharacteristics(List.of("色彩鲜艳", "光影变化", "笔触灵动"));
        style.setDetails("具有典型的印象派特征");
        analysis.setStyle(style);

        LightShadowAnalysis lightShadow = new LightShadowAnalysis();
        lightShadow.setId(UUID.randomUUID().toString());
        lightShadow.setLightDirection("右上方");
        lightShadow.setContrast("中等对比");
        lightShadow.setVolume("立体感强");
        lightShadow.setDetails("光影处理得当，增强了画面深度");
        analysis.setLightShadow(lightShadow);

        analysis.setOverallSummary("这是一幅优秀的印象派风格油画作品，构图合理，色彩搭配和谐，技法娴熟。");
        
        return analysis;
    }

    private Tutorial createMockTutorial() {
        Tutorial tutorial = new Tutorial();
        
        List<TutorialStep> steps = new ArrayList<>();
        
        TutorialStep step1 = new TutorialStep();
        step1.setId(UUID.randomUUID().toString());
        step1.setOrder(1);
        step1.setTitle("准备阶段");
        step1.setDescription("准备画布、颜料和画笔等工具材料");
        step1.setKeyPoints(List.of("选择合适的画布尺寸", "准备基本颜色"));
        steps.add(step1);

        TutorialStep step2 = new TutorialStep();
        step2.setId(UUID.randomUUID().toString());
        step2.setOrder(2);
        step2.setTitle("起稿");
        step2.setDescription("用铅笔勾勒大致轮廓");
        step2.setKeyPoints(List.of("注意构图比例", "确定主体位置"));
        steps.add(step2);

        TutorialStep step3 = new TutorialStep();
        step3.setId(UUID.randomUUID().toString());
        step3.setOrder(3);
        step3.setTitle("铺大色块");
        step3.setDescription("铺设背景和主体的基本色调");
        step3.setKeyPoints(List.of("从大面积开始", "注意色彩层次"));
        steps.add(step3);

        TutorialStep step4 = new TutorialStep();
        step4.setId(UUID.randomUUID().toString());
        step4.setOrder(4);
        step4.setTitle("深入刻画");
        step4.setDescription("细化细节和光影");
        step4.setKeyPoints(List.of("注意明暗对比", "保持笔触方向"));
        steps.add(step4);

        TutorialStep step5 = new TutorialStep();
        step5.setId(UUID.randomUUID().toString());
        step5.setOrder(5);
        step5.setTitle("调整统一");
        step5.setDescription("整体调整画面效果");
        step5.setKeyPoints(List.of("检查整体色调", "调整细节"));
        steps.add(step5);

        tutorial.setSteps(steps);
        tutorial.setMaterials(List.of("油画布", "油画颜料", "画笔", "调色板"));
        tutorial.setTips(List.of("保持调色板清洁", "注意颜料厚度", "多观察实物"));

        return tutorial;
    }

    private Feedback createMockFeedback() {
        Feedback feedback = new Feedback();
        feedback.setStrengths(List.of("色彩把握较好", "构图合理", "笔触流畅"));
        feedback.setWeaknesses(List.of("明暗对比不够强烈", "细节处理有待提高"));
        
        List<Suggestion> suggestions = new ArrayList<>();
        Suggestion s1 = new Suggestion();
        s1.setId(UUID.randomUUID().toString());
        s1.setArea("光影");
        s1.setDescription("加强明暗对比，增强立体感");
        s1.setPriority("high");
        s1.setIsResolved(false);
        suggestions.add(s1);

        Suggestion s2 = new Suggestion();
        s2.setId(UUID.randomUUID().toString());
        s2.setArea("细节");
        s2.setDescription("注意细节刻画，提升画面精致度");
        s2.setPriority("medium");
        s2.setIsResolved(false);
        suggestions.add(s2);

        feedback.setSuggestions(suggestions);
        feedback.setOverallRating(4);
        
        return feedback;
    }

    private ArtworkDTO toArtworkDTO(Artwork artwork) {
        ArtworkDTO dto = new ArtworkDTO();
        dto.setId(artwork.getId());
        dto.setImageUri(artwork.getImageUri());
        dto.setThumbnailUri(artwork.getThumbnailUri());
        dto.setCreatedAt(artwork.getCreatedAt());
        dto.setIsFavorite(artwork.getIsFavorite());
        dto.setTags(artwork.getTags());
        
        if (artwork.getAnalysis() != null) {
            dto.setAnalysis(toAnalysisResultDTO(artwork.getAnalysis()));
        }
        if (artwork.getTutorial() != null) {
            dto.setTutorial(toTutorialDTO(artwork.getTutorial()));
        }
        if (artwork.getPractices() != null) {
            dto.setPractices(artwork.getPractices().stream()
                    .map(this::toPracticeDTO)
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }

    private AnalysisResultDTO toAnalysisResultDTO(AnalysisResult analysis) {
        AnalysisResultDTO dto = new AnalysisResultDTO();
        dto.setId(analysis.getId());
        dto.setOverallSummary(analysis.getOverallSummary());
        
        if (analysis.getComposition() != null) {
            CompositionAnalysis c = analysis.getComposition();
            dto.setComposition(new CompositionAnalysisDTO(
                    c.getLayoutType(), c.getFocalPoint(), 
                    c.getSpatialHierarchy(), c.getNegativeSpace(), c.getDetails()));
        }
        if (analysis.getColor() != null) {
            ColorAnalysis c = analysis.getColor();
            dto.setColor(new ColorAnalysisDTO(
                    c.getPrimaryColors(), c.getSchemeType(), 
                    c.getTemperature(), c.getSaturation(), c.getEmotion(), c.getDetails()));
        }
        if (analysis.getTechnique() != null) {
            TechniqueAnalysis t = analysis.getTechnique();
            dto.setTechnique(new TechniqueAnalysisDTO(
                    t.getMedium(), t.getBrushStroke(), 
                    t.getTexture(), t.getSpecialTechniques(), t.getDetails()));
        }
        if (analysis.getStyle() != null) {
            StyleAnalysis s = analysis.getStyle();
            dto.setStyle(new StyleAnalysisDTO(
                    s.getGenre(), s.getArtistReference(), 
                    s.getCharacteristics(), s.getDetails()));
        }
        if (analysis.getLightShadow() != null) {
            LightShadowAnalysis l = analysis.getLightShadow();
            dto.setLightShadow(new LightShadowAnalysisDTO(
                    l.getLightDirection(), l.getContrast(), l.getVolume(), l.getDetails()));
        }
        
        return dto;
    }

    private TutorialDTO toTutorialDTO(Tutorial tutorial) {
        TutorialDTO dto = new TutorialDTO();
        dto.setId(tutorial.getId());
        dto.setMaterials(tutorial.getMaterials());
        dto.setTips(tutorial.getTips());
        
        if (tutorial.getSteps() != null) {
            dto.setSteps(tutorial.getSteps().stream()
                    .map(s -> new TutorialStepDTO(
                            s.getOrder(), s.getTitle(), s.getDescription(), 
                            s.getKeyPoints(), s.getRegionHint()))
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }

    private PracticeDTO toPracticeDTO(Practice practice) {
        PracticeDTO dto = new PracticeDTO();
        dto.setId(practice.getId());
        dto.setImageUri(practice.getImageUri());
        dto.setCreatedAt(practice.getCreatedAt());
        dto.setCompletedImprovements(practice.getCompletedImprovements());
        
        if (practice.getFeedback() != null) {
            dto.setFeedback(toFeedbackDTO(practice.getFeedback()));
        }
        
        return dto;
    }

    private FeedbackDTO toFeedbackDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setStrengths(feedback.getStrengths());
        dto.setWeaknesses(feedback.getWeaknesses());
        dto.setOverallRating(feedback.getOverallRating());
        
        if (feedback.getSuggestions() != null) {
            dto.setSuggestions(feedback.getSuggestions().stream()
                    .map(s -> new SuggestionDTO(
                            s.getArea(), s.getDescription(), s.getPriority(), s.getIsResolved()))
                    .collect(Collectors.toList()));
        }
        
        return dto;
    }
}