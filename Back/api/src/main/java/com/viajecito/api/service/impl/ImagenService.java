package com.viajecito.api.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IImagenRepository;
import com.viajecito.api.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ImagenService implements IImagenService {

    @Autowired
    private IImagenRepository imagenRepository;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    private StorageService storageService;

    /*

    @Override
    public Set<Imagen> agregar(List<MultipartFile> imagenes) throws BadRequestException, IOException {
        Set<Imagen> agregadas = new HashSet<>();

        for(MultipartFile imagen : imagenes){
            if (imagen == null || imagen.getSize() == 0) {
                throw new BadRequestException("Una o más imágenes no son válidas.");
            }

            String nombre = imagen.getOriginalFilename();
            byte[] contenido = imagen.getBytes();

            try{
                BufferedImage imagenBI = ImageIO.read(imagen.getInputStream());
                if (imagenBI != null) {
                    int ancho = imagenBI.getWidth();
                    int alto = imagenBI.getHeight();
                    if (ancho > 1920 || alto > 1080){
                        imagenBI = Scalr.resize(imagenBI, 1920, 1080);
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

                imagen.getInputStream().close();
            } catch (IOException e) {
                throw new RuntimeException("AGREGAR: " + nombre + " " + e);
            }
        }
        return agregadas;
    } */

    @Override
    public Set<Imagen> agregar(List<MultipartFile> imagenes) throws BadRequestException, IOException {
        Set<Imagen> agregadas = new HashSet<>();
        Integer contador = 1;

        for (MultipartFile imagen : imagenes) {
            if (imagen == null || imagen.getSize() == 0) {
                throw new BadRequestException("Una o más imágenes no son válidas.");
            }

            String originalFilename = imagen.getOriginalFilename();
            List<Imagen> imagenesExistentes = imagenRepository.findByNombre(originalFilename);
            if (!imagenesExistentes.isEmpty()) {
                agregadas.add(imagenesExistentes.get(0));
            } else {
                String descriptiveName = "alojamiento_" + imagen.getName().replaceAll("\\s+", "_").toLowerCase();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String keyName = descriptiveName + "_" + (contador++) + extension;

                storageService.uploadFile(keyName, imagen);

                Imagen nuevaImagen = new Imagen();
                nuevaImagen.setNombre(originalFilename);
                nuevaImagen.setUrl("https://1023c01-grupo1-s3.s3.us-west-1.amazonaws.com/" + keyName);

                agregadas.add(imagenRepository.save(nuevaImagen));
            }
        }
        return agregadas;
    }

    @Transactional
    public Imagen agregar(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    public List<Imagen> buscarPorNombre(String nombreArchivo) {
        return imagenRepository.findByNombre(nombreArchivo);
    }

    public boolean existePorNombre(String nombreArchivo) {
        List<Imagen> imagenes = imagenRepository.findByNombre(nombreArchivo);
        return !imagenes.isEmpty();
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
