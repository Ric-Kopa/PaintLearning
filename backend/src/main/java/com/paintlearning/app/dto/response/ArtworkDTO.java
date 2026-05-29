package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArtworkDTO {
    private String id;
    private String imageUri;
    private String thumbnailUri;
    private AnalysisResultDTO analysis;
    private TutorialDTO tutorial;
    private List<PracticeDTO> practices;
    private LocalDateTime createdAt;
    private Boolean isFavorite;
    private List<String> tags;
}