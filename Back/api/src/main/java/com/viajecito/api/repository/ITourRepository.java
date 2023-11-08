package com.viajecito.api.repository;

import com.viajecito.api.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITourRepository extends JpaRepository<Tour, Long> {
    Optional<Tour> findByTitulo(String titulo);
}
