package com.viajecito.api.service;

import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;

import java.util.Collection;
import java.util.Optional;

public interface IAlojamientoService {
    AlojamientoDTO agregar(Alojamiento alojamiento) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    AlojamientoDTO modificar(Alojamiento alojamiento) throws BadRequestException;
    Optional<AlojamientoDTO> buscarPorId(Long id) throws BadRequestException;
    Collection<Alojamiento> listarTodos();

}