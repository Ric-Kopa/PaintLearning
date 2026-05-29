package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "color_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColorAnalysis {

    @Id
    @Column(length = 36)
    private String id;

    @ElementCollection
    @CollectionTable(name = "color_primary_colors", joinColumns = @JoinColumn(name = "color_analysis_id"))
    @Column(name = "color")
    private List<String> primaryColors = new ArrayList<>();

    @Column(name = "scheme_type", length = 100)
    private String schemeType;

    @Column(length = 100)
    private String temperature;

    @Column(length = 100)
    private String saturation;

    @Column(length = 100)
    private String emotion;

    @Column(length = 1000)
    private String details;
}