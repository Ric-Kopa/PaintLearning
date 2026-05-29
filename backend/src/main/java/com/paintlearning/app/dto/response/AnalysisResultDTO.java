package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResultDTO {

    private String id;
    private CompositionAnalysisDTO composition;
    private ColorAnalysisDTO color;
    private TechniqueAnalysisDTO technique;
    private StyleAnalysisDTO style;
    private LightShadowAnalysisDTO lightShadow;
    private String overallSummary;
}