package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompositionAnalysisDTO {
    private String layoutType;
    private String focalPoint;
    private String spatialHierarchy;
    private String negativeSpace;
    private String details;
}