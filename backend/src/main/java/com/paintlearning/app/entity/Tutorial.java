package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tutorials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tutorial {

    @Id
    @Column(length = 36)
    private String id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "tutorial")
    private List<TutorialStep> steps = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "tutorial_materials", joinColumns = @JoinColumn(name = "tutorial_id"))
    @Column(name = "material")
    private List<String> materials = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "tutorial_tips", joinColumns = @JoinColumn(name = "tutorial_id"))
    @Column(name = "tip")
    private List<String> tips = new ArrayList<>();
}