package com.viajecito.api.service;

import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;

public interface IImagenService {
    ImagenDTO agregar(ImagenDTO dto) throws BadRequestException;
    void borrar(Long id) throws BadRequestException;
}