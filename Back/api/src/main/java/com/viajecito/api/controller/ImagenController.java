package com.viajecito.api.controller;

import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.model.MensajeRespuesta;
import com.viajecito.api.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/imagen")
public class ImagenController{

    @Autowired
    private IImagenService imagenService;

    @PostMapping
    public Set<Imagen> agregar(@RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException, IOException {
        Set<Imagen> resultado = new HashSet<>();
        resultado = imagenService.agregar(imagenes);
        return resultado;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<ImagenDTO> imagen = imagenService.buscarPorId(id);
        if (imagen.isPresent()) {
            byte[] contenidoImagen = imagen.get().getContenido();
            HttpHeaders headers = new HttpHeaders();

            /**** Formato de la imagen (extension) ****/
            String nombre = imagen.get().getNombre();
            String formatoImagen = nombre.substring(nombre.lastIndexOf(".")+1);

            /**** Asigno el tipo de archivo ****/
            if (formatoImagen != null) {
                switch (formatoImagen) {
                    case "png":
                        headers.setContentType(MediaType.IMAGE_PNG);
                        break;
                    default:
                        headers.setContentType(MediaType.IMAGE_JPEG);
                }
            } else {
                headers.setContentType(MediaType.IMAGE_JPEG); // Example: GIF
            }
            return new ResponseEntity(contenidoImagen, headers, HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Error al obtener las imagenes"));
        }
    }

    @GetMapping
    public List<Imagen> listarTodas(){
        return imagenService.listarTodas();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        try {
            imagenService.eliminar(id);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible eliminar la imagen: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Imagen eliminada correctamente");
    }
}
