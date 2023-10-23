package com.viajecito.api.service;

import com.viajecito.api.dto.DireccionDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Direccion;

import java.util.Collection;
import java.util.Optional;

public interface IDireccionService {
    DireccionDTO agregar(DireccionDTO direccionDTO) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    DireccionDTO modificar(Direccion domicilio) throws BadRequestException;
    Optional<DireccionDTO> buscarPorId(Long id) throws BadRequestException;
    Collection<DireccionDTO> listarTodos() throws BadRequestException;
}
