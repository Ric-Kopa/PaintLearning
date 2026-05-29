package com.paintlearning.app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AISettingsUpdateRequest {

    private String model;

    private String openaiKey;

    private String claudeKey;

    private String geminiKey;

    private String language;
}