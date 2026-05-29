package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechniqueAnalysisDTO {
    private String medium;
    private String brushStroke;
    private String texture;
    private List<String> specialTechniques;
    private String details;
}