package com.paintlearning.app.service;

import com.paintlearning.app.dto.request.AISettingsUpdateRequest;
import com.paintlearning.app.dto.response.AISettingsDTO;

public interface AISettingsService {
    AISettingsDTO getSettings();
    AISettingsDTO updateSettings(AISettingsUpdateRequest request);
    void resetSettings();
}