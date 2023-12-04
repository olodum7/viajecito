package com.viajecito.api.repository;

import com.viajecito.api.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IImagenRepository extends JpaRepository<Imagen,Long> {
    List<Imagen> findByNombre(String nombre);
}
