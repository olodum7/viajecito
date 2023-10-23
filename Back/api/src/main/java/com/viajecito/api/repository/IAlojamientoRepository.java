package com.viajecito.api.repository;

import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface IAlojamientoRepository extends JpaRepository<Alojamiento, Long> {
    Optional<Alojamiento> findByNombreAndDireccionesIn(String nombre, Set<Direccion> direcciones);
}