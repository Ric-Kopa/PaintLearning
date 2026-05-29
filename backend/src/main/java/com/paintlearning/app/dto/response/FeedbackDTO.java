package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private String id;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<SuggestionDTO> suggestions;
    private Integer overallRating;
}