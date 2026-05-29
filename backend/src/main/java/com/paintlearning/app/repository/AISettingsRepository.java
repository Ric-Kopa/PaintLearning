package com.paintlearning.app.repository;

import com.paintlearning.app.entity.AISettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AISettingsRepository extends JpaRepository<AISettings, String> {
}