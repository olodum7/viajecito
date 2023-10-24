package com.viajecito.api.controller;

import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.service.IImagenService;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/imagen")
public class ImagenController{
    private static final Logger log = Logger.getLogger(DireccionController.class);

    @Autowired
    private IImagenService imagenService;

    @PostMapping
    public Set<Imagen> agregar(@RequestPart("imagenes") List<MultipartFile> imagenes) {
        Set<Imagen> resultado = new HashSet<Imagen>();
        try {
            resultado = imagenService.agregar(imagenes);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return resultado;
    }
    @GetMapping("/{nombre}")
    public ResponseEntity<byte[]> buscarPorNombre(@PathVariable String nombre) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Ajusta el tipo de contenido según el tipo de imagen
                .body(imagenService.buscarPorNombre(nombre));
    }

    @GetMapping
    public List<String> listarTodas(){
        return imagenService.listarTodas();
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        imagenService.eliminar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Imagen eliminada correctamente");
        return respuesta;
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN IMAGEN: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
