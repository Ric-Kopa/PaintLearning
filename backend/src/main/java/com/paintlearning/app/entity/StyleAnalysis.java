package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "style_analyses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StyleAnalysis {

    @Id
    @Column(length = 36)
    private String id;

    @Column(length = 100)
    private String genre;

    @Column(name = "artist_reference", length = 200)
    private String artistReference;

    @ElementCollection
    @CollectionTable(name = "style_characteristics", joinColumns = @JoinColumn(name = "style_analysis_id"))
    @Column(name = "characteristic")
    private List<String> characteristics = new ArrayList<>();

    @Column(length = 1000)
    private String details;
}