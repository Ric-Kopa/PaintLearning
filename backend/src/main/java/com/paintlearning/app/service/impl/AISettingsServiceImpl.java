package com.paintlearning.app.service.impl;

import com.paintlearning.app.dto.request.AISettingsUpdateRequest;
import com.paintlearning.app.dto.response.AISettingsDTO;
import com.paintlearning.app.entity.AISettings;
import com.paintlearning.app.repository.AISettingsRepository;
import com.paintlearning.app.service.AISettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AISettingsServiceImpl implements AISettingsService {

    @Autowired
    private AISettingsRepository settingsRepository;

    private static final String DEFAULT_SETTINGS_ID = "default-settings";

    @Override
    public AISettingsDTO getSettings() {
        AISettings settings = settingsRepository.findById(DEFAULT_SETTINGS_ID)
                .orElseGet(this::createDefaultSettings);
        return toAISettingsDTO(settings);
    }

    @Override
    @Transactional
    public AISettingsDTO updateSettings(AISettingsUpdateRequest request) {
        AISettings settings = settingsRepository.findById(DEFAULT_SETTINGS_ID)
                .orElseGet(this::createDefaultSettings);

        if (request.getModel() != null) settings.setModel(request.getModel());
        if (request.getOpenaiKey() != null) settings.setOpenaiKey(request.getOpenaiKey());
        if (request.getClaudeKey() != null) settings.setClaudeKey(request.getClaudeKey());
        if (request.getGeminiKey() != null) settings.setGeminiKey(request.getGeminiKey());
        if (request.getLanguage() != null) settings.setLanguage(request.getLanguage());

        AISettings saved = settingsRepository.save(settings);
        return toAISettingsDTO(saved);
    }

    @Override
    @Transactional
    public void resetSettings() {
        AISettings settings = createDefaultSettings();
        settingsRepository.save(settings);
    }

    private AISettings createDefaultSettings() {
        AISettings settings = new AISettings();
        settings.setId(DEFAULT_SETTINGS_ID);
        settings.setModel("openai");
        settings.setLanguage("zh");
        return settingsRepository.save(settings);
    }

    private AISettingsDTO toAISettingsDTO(AISettings settings) {
        AISettingsDTO dto = new AISettingsDTO();
        dto.setId(settings.getId());
        dto.setModel(settings.getModel());
        dto.setLanguage(settings.getLanguage());
        return dto;
    }
}