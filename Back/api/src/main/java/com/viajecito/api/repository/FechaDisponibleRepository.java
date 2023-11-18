package com.viajecito.api.repository;

import com.viajecito.api.model.FechaDisponible;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FechaDisponibleRepository extends JpaRepository<FechaDisponible, Long> {

}