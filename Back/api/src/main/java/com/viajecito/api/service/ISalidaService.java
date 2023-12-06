package com.viajecito.api.service;

import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Salida;
import com.viajecito.api.model.Tour;

public interface ISalidaService {
    SalidaDTO agregar(Salida salida) throws BadRequestException;
    SalidaDTO modificar(Salida salida);
    SalidaDTO buscarPorId(Long id) throws BadRequestException;
    SalidaDTO buscarActivoPorTour(Tour tour) throws BadRequestException;
}
