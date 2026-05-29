package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ai_settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AISettings {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(name = "openai_key", length = 200)
    private String openaiKey;

    @Column(name = "claude_key", length = 200)
    private String claudeKey;

    @Column(name = "gemini_key", length = 200)
    private String geminiKey;

    @Column(nullable = false, length = 10)
    private String language;
}