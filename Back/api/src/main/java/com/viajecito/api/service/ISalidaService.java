package com.viajecito.api.service;

import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Salida;

public interface ISalidaService {
    SalidaDTO agregar(Salida salida);
    SalidaDTO buscarPorId(Long id) throws BadRequestException;
}
