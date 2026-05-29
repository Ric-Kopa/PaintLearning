package com.paintlearning.app.service;

import com.paintlearning.app.dto.request.AnalysisRequest;
import com.paintlearning.app.dto.request.PracticeRequest;
import com.paintlearning.app.dto.response.AnalysisResultDTO;
import com.paintlearning.app.dto.response.ArtworkDTO;
import com.paintlearning.app.dto.response.FeedbackDTO;
import com.paintlearning.app.dto.response.TutorialDTO;

import java.util.List;

public interface ArtworkService {
    ArtworkDTO createArtwork(String imageUri, String thumbnailUri, List<String> tags);
    ArtworkDTO getArtworkById(String id);
    List<ArtworkDTO> getAllArtworks();
    List<ArtworkDTO> getFavoriteArtworks();
    ArtworkDTO updateArtwork(String id, String imageUri, String thumbnailUri, List<String> tags);
    void deleteArtwork(String id);
    ArtworkDTO toggleFavorite(String id);
    AnalysisResultDTO analyzeArtwork(String artworkId, AnalysisRequest request);
    TutorialDTO generateTutorial(String artworkId);
    FeedbackDTO createPractice(PracticeRequest request);
}