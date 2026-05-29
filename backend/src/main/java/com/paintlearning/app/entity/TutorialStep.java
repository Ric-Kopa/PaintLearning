package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tutorial_steps")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TutorialStep {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorial_id")
    private Tutorial tutorial;

    @Column(nullable = false)
    private Integer order;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    @CollectionTable(name = "tutorial_step_key_points", joinColumns = @JoinColumn(name = "tutorial_step_id"))
    @Column(name = "key_point")
    private List<String> keyPoints = new ArrayList<>();

    @Column(name = "region_hint", length = 200)
    private String regionHint;
}