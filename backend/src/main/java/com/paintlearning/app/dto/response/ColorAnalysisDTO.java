package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColorAnalysisDTO {
    private List<String> primaryColors;
    private String schemeType;
    private String temperature;
    private String saturation;
    private String emotion;
    private String details;
}