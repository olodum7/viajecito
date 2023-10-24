package com.viajecito.api.service;

import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.service.impl.ActividadService;

import java.util.Collection;
import java.util.Optional;

public interface IActividadService {
    ActividadDTO agregar(ActividadDTO actividadDTO) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    ActividadDTO modificar(Actividad actividad) throws BadRequestException;
    Optional<ActividadDTO> buscarPorId(Long id) throws BadRequestException;
    Collection<ActividadDTO> listarTodos() throws BadRequestException;
}
