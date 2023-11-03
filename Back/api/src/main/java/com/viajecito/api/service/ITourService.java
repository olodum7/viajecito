package com.viajecito.api.service;

import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Tour;

import java.util.Collection;
import java.util.Optional;

public interface ITourService {
    TourDTO agregar(TourDTO tourDTO) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    TourDTO modificar(Tour tour) throws BadRequestException;
    Optional<TourDTO> buscarPorId(Long id);
    Collection<Tour> listarTodos();
}
