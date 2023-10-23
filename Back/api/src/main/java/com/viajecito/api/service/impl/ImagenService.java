package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IImagenRepository;
import com.viajecito.api.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImagenService implements IImagenService {
    @Autowired
    private IImagenRepository imagenRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public ImagenDTO agregar(ImagenDTO imagenDTO) throws BadRequestException {
        Optional<Imagen> encontrada = imagenRepository.buscarXNombre(imagenDTO.getNombre());
        if (mapper.convertValue(encontrada, ImagenDTO.class) instanceof ImagenDTO)
            throw new BadRequestException("ACCIÓN NO REALIZADA:Ya existe una imagen con el nombre ingresado");
        return toDTO(imagenRepository.save(toModel(imagenDTO)));
    }

    @Override
    public void borrar(Long id) throws BadRequestException {
        Optional<Imagen> encontrada = imagenRepository.findById(id);
        if (!encontrada.isPresent())
            throw new BadRequestException("INFORMACIÓN: No existe la imagen a eliminar");
        imagenRepository.deleteById(id);
    }

    @Override
    public ImagenDTO buscarPorNombre(String nombre) throws BadRequestException {
        Optional<Imagen> encontrada = imagenRepository.buscarXNombre(nombre);
        if (!encontrada.isPresent())
            throw new BadRequestException("INFORMACIÓN: No existe la imagen detallada");
        return mapper.convertValue(encontrada, ImagenDTO.class);
    }

    private ImagenDTO toDTO(Imagen i){
        return mapper.convertValue(i,ImagenDTO.class);
    }

    private Imagen toModel(ImagenDTO i){
        return mapper.convertValue(i, Imagen.class);
    }
}
