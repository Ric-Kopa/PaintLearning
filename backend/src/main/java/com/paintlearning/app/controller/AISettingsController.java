package com.paintlearning.app.controller;

import com.paintlearning.app.dto.request.AISettingsUpdateRequest;
import com.paintlearning.app.dto.response.ApiResponse;
import com.paintlearning.app.dto.response.AISettingsDTO;
import com.paintlearning.app.service.AISettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai-settings")
public class AISettingsController {

    @Autowired
    private AISettingsService settingsService;

    @GetMapping
    public ResponseEntity<ApiResponse<AISettingsDTO>> getSettings() {
        AISettingsDTO settings = settingsService.getSettings();
        return ResponseEntity.ok(ApiResponse.success(settings));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<AISettingsDTO>> updateSettings(@RequestBody AISettingsUpdateRequest request) {
        AISettingsDTO settings = settingsService.updateSettings(request);
        return ResponseEntity.ok(ApiResponse.success("更新成功", settings));
    }

    @PostMapping("/reset")
    public ResponseEntity<ApiResponse<Void>> resetSettings() {
        settingsService.resetSettings();
        return ResponseEntity.ok(ApiResponse.success("重置成功", null));
    }
}