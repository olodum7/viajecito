package com.viajecito.api.repository;

import com.viajecito.api.model.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface IActividadRepository extends JpaRepository<Actividad, Long> {
    Optional<Actividad> findByNombreAndFechaHora(String nombre, LocalDateTime fechaHora );
}
