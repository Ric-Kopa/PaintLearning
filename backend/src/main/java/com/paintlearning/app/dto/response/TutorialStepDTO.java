package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TutorialStepDTO {
    private Integer order;
    private String title;
    private String description;
    private List<String> keyPoints;
    private String regionHint;
}