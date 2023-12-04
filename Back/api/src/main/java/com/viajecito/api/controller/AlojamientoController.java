package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.AlojamientoTipo;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.model.MensajeRespuesta;
import com.viajecito.api.repository.IAlojamientoRepository;
import com.viajecito.api.service.IAlojamientoService;
import com.viajecito.api.service.impl.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.viajecito.api.service.impl.StorageService;

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

    @Autowired
    private StorageService storageService;

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
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Todos los campos son obligatorios."));

            alojamiento.setTipo(tipo);
            alojamiento.setNombre(nombre);
            alojamiento.setUbicacion(ubicacion);

            /**** Si las imagenes no existen, se agregan ****/
            if (!imagenes.isEmpty()) {
                Integer contador = 1;
                for (MultipartFile imagen : imagenes) {
                    String originalFilename = imagen.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String descriptiveName = "alojamiento_" + nombre.replaceAll("\\s+", "_").toLowerCase();
                    String keyName = descriptiveName + "_" + (contador++) + extension;

                    if (!imagenService.existePorNombre(keyName)) {
                        storageService.uploadFile(keyName, imagen);
                        Imagen img = new Imagen();
                        img.setNombre(originalFilename);
                        img.setUrl("https://1023c01-grupo1-s3.s3.amazonaws.com/" + keyName);
                        img = imagenService.agregar(img);
                        imagenesAlojamiento.add(img);
                    }
                }
                alojamiento.setImagenes(imagenesAlojamiento);
            }
            return ResponseEntity.ok(new MensajeRespuesta( "ok", alojamientoService.agregar(alojamiento).getTipo() + " agregado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
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
                                       @RequestParam("nombre") String nombre,
                                       @RequestParam("tipo") AlojamientoTipo tipo,
                                       @RequestParam("ubicacion") String ubicacion,
                                       @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException, IOException {
        try {
            Optional<Alojamiento> alojamientoOpt = alojamientoRepository.findById(id);
            if (!alojamientoOpt.isPresent()) {
                throw new BadRequestException("El alojamiento indicado no existe.");
            }

            Alojamiento alojamiento = alojamientoOpt.get();
            alojamiento.setTipo(tipo);
            alojamiento.setNombre(nombre);
            alojamiento.setUbicacion(ubicacion);

            Set<Imagen> imagenesAlojamiento = new HashSet<>(alojamiento.getImagenes()); // Imágenes existentes

            if (!imagenes.isEmpty()) {
                Integer contador = imagenesAlojamiento.size() + 1;
                for (MultipartFile imagen : imagenes) {
                    String originalFilename = imagen.getOriginalFilename();
                    List<Imagen> imagenesExistentes = imagenService.buscarPorNombre(originalFilename);
                    if (imagenesExistentes.isEmpty()) {
                        String descriptiveName = "alojamiento_" + alojamiento.getNombre().replaceAll("\\s+", "_").toLowerCase();
                        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                        String keyName = descriptiveName + "_" + (contador++) + extension;

                        storageService.uploadFile(keyName, imagen);
                        Imagen img = new Imagen();
                        img.setNombre(originalFilename);
                        img.setUrl("https://1023c01-grupo1-s3.s3.amazonaws.com/" + keyName);
                        img = imagenService.agregar(img); // Agregar la imagen a la base de datos
                        imagenesAlojamiento.add(img);
                    } else {
                        imagenesAlojamiento.add(imagenesExistentes.get(0)); // Reutiliza la instancia existente
                    }
                }
            }

            alojamiento.setImagenes(imagenesAlojamiento);
            alojamientoService.modificar(alojamiento);
            return ResponseEntity.status(HttpStatus.OK).body(new MensajeRespuesta("ok", "Alojamiento modificado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MensajeRespuesta("error", "No es posible modificar el alojamiento: " + e.getMessage()));
        }
    }

    @GetMapping(path = "/{id}")
    public Optional<AlojamientoDTO> buscarPorId(@PathVariable Long id) throws Exception{
        return alojamientoService.buscarPorId(id);
    }

    @GetMapping
    public Collection<Alojamiento> listarTodos(){
        return alojamientoService.listarTodos();
    }
}
