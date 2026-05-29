package com.paintlearning.app.repository;

import com.paintlearning.app.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtworkRepository extends JpaRepository<Artwork, String> {
    List<Artwork> findByIsFavoriteTrue();
    List<Artwork> findAllByOrderByCreatedAtDesc();
}