package com.paintlearning.app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleAnalysisDTO {
    private String genre;
    private String artistReference;
    private List<String> characteristics;
    private String details;
}