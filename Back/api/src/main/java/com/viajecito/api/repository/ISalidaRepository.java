package com.viajecito.api.repository;

import com.viajecito.api.model.Salida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISalidaRepository extends JpaRepository<Salida, Long> {
}
