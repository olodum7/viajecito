package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.AlojamientoTipo;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IAlojamientoRepository;
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
    private IAlojamientoRepository alojamientoRepository;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre") String nombre,
                                     @RequestParam("tipo") AlojamientoTipo tipo,
                                     @RequestParam("ubicacion") String ubicacion,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes ) throws BadRequestException, IOException {

        Alojamiento alojamiento = new Alojamiento();
        Set<Imagen> imagenesAlojamiento = new HashSet<>();

        try{
            /************* VALIDACION DE CAMPOS *************/
            if (nombre == null || tipo == null || ubicacion == null || (imagenes == null || imagenes.isEmpty()))
                throw new BadRequestException("Todos los campos son obligatorios.");

            alojamiento.setTipo(tipo);
            alojamiento.setNombre(nombre);
            alojamiento.setUbicacion(ubicacion);

            /**** Si las imagenes no existen, se agregan ****/
            if (!imagenes.isEmpty()) {
                imagenesAlojamiento = imagenService.agregar(imagenes);
                alojamiento.setImagenes(imagenesAlojamiento);
            }
            return ResponseEntity.ok(alojamientoService.agregar(alojamiento));

        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        try {
            alojamientoService.eliminar(id);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible eliminar el alojamiento: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Alojamiento eliminado correctamente.");
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> modificar(@PathVariable Long id,
                                       @RequestParam("tipo") AlojamientoTipo tipo,
                                       @RequestParam("ubicacion") String ubicacion,
                                       @RequestPart("imagenes") List<MultipartFile> imagenes ) throws BadRequestException{
        Set<Imagen> imagenesAlojamiento = new HashSet<>();

        try {
            Optional<Alojamiento> alojamiento = alojamientoRepository.findById(id);
            if(!alojamiento.isPresent())
                throw new BadRequestException("El alojamiento indicado no existe.");

            alojamiento.get().setTipo(tipo);
            alojamiento.get().setUbicacion(ubicacion);

            /**** Si las imagenes no existen, se agregan ****/
            /* Pendiente ver casos donde se eliminan */
            if (!imagenes.isEmpty()) {
                imagenesAlojamiento = imagenService.agregar(imagenes);
                alojamiento.get().setImagenes(imagenesAlojamiento);
            }

            alojamientoService.modificar(alojamiento.get());
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible modificar el alojamiento: " + e);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body("Alojamiento modificado correctamente.");
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
