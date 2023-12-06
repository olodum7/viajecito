package com.viajecito.api.service;

import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Salida;
import java.util.List;
import com.viajecito.api.model.Tour;

public interface ISalidaService {
    SalidaDTO agregar(Salida salida) throws BadRequestException;
    SalidaDTO modificar(Salida salida);
    SalidaDTO buscarPorId(Long id) throws BadRequestException;
    List<SalidaDTO> obtenerTodas();
    SalidaDTO actualizar(Long id, Salida datosSalida) throws BadRequestException;
    boolean eliminar(Long id);
    SalidaDTO buscarActivoPorTour(Tour tour) throws BadRequestException;
}
