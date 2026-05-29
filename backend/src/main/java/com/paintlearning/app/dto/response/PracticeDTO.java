package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PracticeDTO {
    private String id;
    private String imageUri;
    private FeedbackDTO feedback;
    private List<String> completedImprovements;
    private LocalDateTime createdAt;
}