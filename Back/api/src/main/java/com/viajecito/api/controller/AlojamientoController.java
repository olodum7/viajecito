package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.service.IAlojamientoService;
import com.viajecito.api.service.impl.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/alojamiento")
public class AlojamientoController {
    @Autowired
    private IAlojamientoService alojamientoService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre") String nombre,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes ) throws BadRequestException, IOException {

        AlojamientoDTO alojamientoDTO = new AlojamientoDTO();
        Set<Imagen> imagenesAlojamiento = new HashSet<>();
        alojamientoDTO.setNombre(nombre);

        /**** Si las imagene no existen, se agregan ****/
        if (!imagenes.isEmpty()) {
            imagenesAlojamiento = imagenService.agregar(imagenes);
            alojamientoDTO.setImagenes(imagenesAlojamiento);
        }
        return ResponseEntity.ok(alojamientoService.agregar(alojamientoDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        alojamientoService.eliminar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Alojamiento eliminada correctamente");
        return respuesta;
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Alojamiento alojamiento) throws BadRequestException{
        return ResponseEntity.ok(alojamientoService.modificar(alojamiento));
    }

    @GetMapping(path = "/{id}")
    public Optional<AlojamientoDTO> buscarPorId(@PathVariable Long id) throws Exception{
        return alojamientoService.buscarPorId(id);
    }

    @GetMapping
    public Collection<Alojamiento> listarTodos() throws BadRequestException{
        return alojamientoService.listarTodos();
    }
}
