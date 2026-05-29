package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LightShadowAnalysisDTO {
    private String lightDirection;
    private String contrast;
    private String volume;
    private String details;
}