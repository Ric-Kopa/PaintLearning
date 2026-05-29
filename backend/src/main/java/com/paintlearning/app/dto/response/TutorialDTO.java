package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TutorialDTO {
    private String id;
    private List<TutorialStepDTO> steps;
    private List<String> materials;
    private List<String> tips;
}