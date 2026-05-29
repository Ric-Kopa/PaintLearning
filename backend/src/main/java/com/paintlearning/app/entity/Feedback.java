package com.paintlearning.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "feedbacks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @Column(length = 36)
    private String id;

    @ElementCollection
    @CollectionTable(name = "feedback_strengths", joinColumns = @JoinColumn(name = "feedback_id"))
    @Column(name = "strength")
    private List<String> strengths = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "feedback_weaknesses", joinColumns = @JoinColumn(name = "feedback_id"))
    @Column(name = "weakness")
    private List<String> weaknesses = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "feedback")
    private List<Suggestion> suggestions = new ArrayList<>();

    @Column(name = "overall_rating")
    private Integer overallRating;
}