package com.viajecito.api.controller;

import com.viajecito.api.dto.ImagenDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.service.IImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/imagen")
public class ImagenController{
    private static final Logger log = Logger.getLogger(DireccionController.class);

    @Autowired
    IImagenService imagenService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody ImagenDTO imagenDTO) throws BadRequestException {
        return ResponseEntity.ok(imagenService.agregar(imagenDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        imagenService.borrar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Imagen eliminada correctamente");
        return respuesta;
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN IMAGEN: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
