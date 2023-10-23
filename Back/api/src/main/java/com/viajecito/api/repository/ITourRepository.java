package com.viajecito.api.repository;

import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ITourRepository extends JpaRepository<Tour, Long> {
    Optional<Tour> findByNombreAndActividadesInAndAlojamientosIn(String nombre, Set<Actividad> actividades, Set<Alojamiento> alojamientos);
}
