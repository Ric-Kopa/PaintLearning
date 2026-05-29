package com.paintlearning.app.controller;

import com.paintlearning.app.dto.request.AnalysisRequest;
import com.paintlearning.app.dto.request.ArtworkCreateRequest;
import com.paintlearning.app.dto.request.PracticeRequest;
import com.paintlearning.app.dto.response.ApiResponse;
import com.paintlearning.app.dto.response.AnalysisResultDTO;
import com.paintlearning.app.dto.response.ArtworkDTO;
import com.paintlearning.app.dto.response.FeedbackDTO;
import com.paintlearning.app.dto.response.TutorialDTO;
import com.paintlearning.app.service.ArtworkService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artworks")
public class ArtworkController {

    @Autowired
    private ArtworkService artworkService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ArtworkDTO>>> getAllArtworks() {
        List<ArtworkDTO> artworks = artworkService.getAllArtworks();
        return ResponseEntity.ok(ApiResponse.success(artworks));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ArtworkDTO>> getArtworkById(@PathVariable String id) {
        ArtworkDTO artwork = artworkService.getArtworkById(id);
        return ResponseEntity.ok(ApiResponse.success(artwork));
    }

    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse<List<ArtworkDTO>>> getFavoriteArtworks() {
        List<ArtworkDTO> favorites = artworkService.getFavoriteArtworks();
        return ResponseEntity.ok(ApiResponse.success(favorites));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ArtworkDTO>> createArtwork(@Valid @RequestBody ArtworkCreateRequest request) {
        ArtworkDTO artwork = artworkService.createArtwork(
                request.getImageUri(),
                request.getThumbnailUri(),
                request.getTags()
        );
        return ResponseEntity.ok(ApiResponse.success("创建成功", artwork));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ArtworkDTO>> updateArtwork(
            @PathVariable String id,
            @RequestBody ArtworkCreateRequest request) {
        ArtworkDTO artwork = artworkService.updateArtwork(
                id,
                request.getImageUri(),
                request.getThumbnailUri(),
                request.getTags()
        );
        return ResponseEntity.ok(ApiResponse.success("更新成功", artwork));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteArtwork(@PathVariable String id) {
        artworkService.deleteArtwork(id);
        return ResponseEntity.ok(ApiResponse.success("删除成功", null));
    }

    @PostMapping("/{id}/favorite")
    public ResponseEntity<ApiResponse<ArtworkDTO>> toggleFavorite(@PathVariable String id) {
        ArtworkDTO artwork = artworkService.toggleFavorite(id);
        return ResponseEntity.ok(ApiResponse.success(artwork));
    }

    @PostMapping("/{id}/analyze")
    public ResponseEntity<ApiResponse<AnalysisResultDTO>> analyzeArtwork(
            @PathVariable String id,
            @Valid @RequestBody AnalysisRequest request) {
        AnalysisResultDTO analysis = artworkService.analyzeArtwork(id, request);
        return ResponseEntity.ok(ApiResponse.success("分析成功", analysis));
    }

    @PostMapping("/{id}/tutorial")
    public ResponseEntity<ApiResponse<TutorialDTO>> generateTutorial(@PathVariable String id) {
        TutorialDTO tutorial = artworkService.generateTutorial(id);
        return ResponseEntity.ok(ApiResponse.success("教程生成成功", tutorial));
    }

    @PostMapping("/practice")
    public ResponseEntity<ApiResponse<FeedbackDTO>> createPractice(@Valid @RequestBody PracticeRequest request) {
        FeedbackDTO feedback = artworkService.createPractice(request);
        return ResponseEntity.ok(ApiResponse.success("练习反馈生成成功", feedback));
    }
}