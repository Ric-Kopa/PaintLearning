package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "light_shadow_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LightShadowAnalysis {

    @Id
    @Column(length = 36)
    private String id;

    @Column(name = "light_direction", length = 100)
    private String lightDirection;

    @Column(length = 100)
    private String contrast;

    @Column(length = 100)
    private String volume;

    @Column(length = 1000)
    private String details;
}