package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "composition_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompositionAnalysis {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "layout_type", length = 100)
    private String layoutType;

    @Column(name = "focal_point", length = 200)
    private String focalPoint;

    @Column(name = "spatial_hierarchy", length = 200)
    private String spatialHierarchy;

    @Column(name = "negative_space", length = 200)
    private String negativeSpace;

    @Column(length = 1000)
    private String details;
}