package com.viajecito.api.service;

import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Salida;
import com.viajecito.api.model.Tour;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Optional;

public interface ITourService {
    TourDTO agregar(Tour tour) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    TourDTO modificar(Tour tour) throws BadRequestException;
    TourDTO buscarPorId(Long id) throws BadRequestException;
    Collection<TourDTO> listarTodos() throws BadRequestException;
    Collection<TourDTO> listarDisponibles(LocalDate fechaSalida) throws BadRequestException;
}
