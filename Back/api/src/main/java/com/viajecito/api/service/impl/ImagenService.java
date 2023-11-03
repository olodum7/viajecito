package com.viajecito.api.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IImagenRepository;
import com.viajecito.api.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    private IImagenRepository imagenRepository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public Set<Imagen> agregar(List<MultipartFile> imagenes) throws BadRequestException, IOException {
        Set<Imagen> agregadas = new HashSet<>();

        /**** Recorro lista de imagenes ****/
        for(MultipartFile imagen : imagenes){
            /** Corroboro que no este vacia **/
            if (imagen == null || imagen.getSize() == 0) {
                throw new BadRequestException("Una o más imágenes no son válidas.");
            }

            String nombre = imagen.getOriginalFilename();
            byte[] contenido = imagen.getBytes();

            try{
                /** Corroboro tamaño máximo **/
                BufferedImage imagenBI = ImageIO.read(imagen.getInputStream());
                if (imagenBI != null) {
                    int ancho = imagenBI.getWidth();
                    int alto = imagenBI.getHeight();
                    if (ancho > 1920 || alto > 1080){
                        throw new BadRequestException("Se superó el tamaño máximo permitido 1920x1080.");
                    }
                }

                ImagenDTO imagenDTO = new ImagenDTO();
                imagenDTO.setNombre(nombre);
                imagenDTO.setContenido(contenido);

                Imagen existeImagen = imagenRepository.findByNombre(nombre).orElse(null);
                if (existeImagen != null) {
                    agregadas.add(existeImagen);
                }else{
                    agregadas.add(imagenRepository.save(toModel(imagenDTO)));
                }

                /** Limpio temporales de forma manual **/
                imagen.getInputStream().close();
            } catch (IOException e) {
                throw new RuntimeException("AGREGAR: " + nombre + " " + e);
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        }
        return agregadas;
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        Optional<Imagen> imagen = imagenRepository.findById(id);
        if (!imagen.isPresent()) {
            throw new BadRequestException("La imagen a eliminar no existe.");
        }
        imagenRepository.deleteById(id);
    }

    @Override
    public Optional<ImagenDTO> buscarPorId(Long id) {
        Optional<Imagen> encontrada = imagenRepository.findById(id);
        return encontrada.map(imagen -> toDTO(imagen));
    }

    @Override
    public List<Imagen> listarTodas() {
        return imagenRepository.findAll();
    }

    private ImagenDTO toDTO(Imagen i){
        return mapper.convertValue(i,ImagenDTO.class);
    }

    private Imagen toModel(ImagenDTO i){
        return mapper.convertValue(i, Imagen.class);
    }

}
