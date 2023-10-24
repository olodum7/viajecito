package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IImagenRepository;
import com.viajecito.api.service.IImagenService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ImagenService implements IImagenService {

    @Value("${file.upload-dir}")
    private String uploadDirectory;

    @Autowired
    private IImagenRepository imagenRepository;

    @Autowired
    ObjectMapper mapper;
    @Override
    public Set<Imagen> agregar(List<MultipartFile> imagenes) throws IOException {
        Set<Imagen> agregadas = new HashSet<Imagen>();

        Path uploadPath = Paths.get(uploadDirectory);
        for(MultipartFile imagen : imagenes){
            if (!uploadPath.toFile().exists()) {
                uploadPath.toFile().mkdir();
            }

            String fileName = imagen.getOriginalFilename();
            File destFile = new File(uploadPath.toString() + File.separator + fileName);
            try{
                imagen.transferTo(destFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            // Agrego en la base de datos
            ImagenDTO imagenDTO = new ImagenDTO();
            imagenDTO.setNombre(fileName);
            imagenDTO.setUrl(uploadDirectory+fileName);

            agregadas.add(imagenRepository.save(toModel(imagenDTO)));
        }

        return agregadas;
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        Optional<Imagen> imagen = imagenRepository.findById(id);
        if (!imagen.isPresent()) {
            throw new BadRequestException("ACCIÓN NO REALIZADA: No existe la imagen a borrar");
        }

        File archivo = new File(imagen.get().getUrl());
        if (archivo.exists()) {
            archivo.delete();
        }

        imagenRepository.deleteById(id);
    }

    @Override
    public byte[] buscarPorNombre(String nombre) {
        byte[] imageBytes;
        try {
            InputStream imageStream = new FileInputStream(uploadDirectory + nombre);
            imageBytes = IOUtils.toByteArray(imageStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return imageBytes;
    }

    @Override
    public List<String> listarTodas() {
        List<Imagen> imagenesBD = imagenRepository.findAll();
        List<String> urls = imagenesBD.stream()
                .map(Imagen::getUrl)
                .collect(Collectors.toList());
        return urls;
    }

    private ImagenDTO toDTO(Imagen i){
        return mapper.convertValue(i,ImagenDTO.class);
    }

    private Imagen toModel(ImagenDTO i){
        return mapper.convertValue(i, Imagen.class);
    }
}
