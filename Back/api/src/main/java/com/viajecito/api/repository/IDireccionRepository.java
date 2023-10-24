package com.viajecito.api.repository;

import com.viajecito.api.model.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IDireccionRepository extends JpaRepository<Direccion, Long> {
    Optional<Direccion> findByDomicilioAndLocalidadAndProvincia(String domicilio, String localidad, String provincia);
}