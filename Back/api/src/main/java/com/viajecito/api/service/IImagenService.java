package com.viajecito.api.service;

import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IImagenService {
    Set<Imagen> agregar(List<MultipartFile> imagenes) throws BadRequestException, IOException;
    void eliminar(Long id) throws BadRequestException;
    Optional<ImagenDTO> buscarPorId(Long id);
    List<Imagen> listarTodas();
}