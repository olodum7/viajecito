package com.viajecito.api.repository;

import com.viajecito.api.model.Salida;
import com.viajecito.api.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface ISalidaRepository extends JpaRepository<Salida, Long> {
    Optional<Salida> findByTour(Tour tour);
}
