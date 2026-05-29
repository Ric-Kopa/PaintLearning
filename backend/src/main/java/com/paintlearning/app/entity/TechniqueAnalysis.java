package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "technique_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechniqueAnalysis {

    @Id
    @Column(length = 36)
    private String id;

    @Column(length = 100)
    private String medium;

    @Column(name = "brush_stroke", length = 200)
    private String brushStroke;

    @Column(length = 200)
    private String texture;

    @ElementCollection
    @CollectionTable(name = "technique_special_techniques", joinColumns = @JoinColumn(name = "technique_analysis_id"))
    @Column(name = "technique")
    private List<String> specialTechniques = new ArrayList<>();

    @Column(length = 1000)
    private String details;
}