package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.*;
import com.viajecito.api.service.ITourService;
import com.viajecito.api.service.impl.ActividadService;
import com.viajecito.api.service.impl.AlojamientoService;
import com.viajecito.api.service.impl.ImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/tour")
public class TourController {
    private static final Logger log = Logger.getLogger(TourController.class);

    @Autowired
    private ITourService tourService;

    @Autowired
    private AlojamientoService alojamientoService;

    @Autowired
    private ActividadService actividadService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre")  String nombre,
                                     @RequestParam("descripcion") String descripcion,
                                     @RequestParam("precio") Double precio,
                                     @RequestParam("transporte") String transporte,
                                     @RequestParam("categoria")TourCategoria categoria,
                                     @RequestParam("alojamientos") List<Long> alojamientos,
                                     @RequestParam("actividades") List<Long> actividades,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException{
        TourDTO tourDTO = new TourDTO();
        tourDTO.setNombre(nombre);
        tourDTO.setDescripcion(descripcion);
        tourDTO.setPrecio(precio);
        tourDTO.setTransporte(transporte);
        tourDTO.setCategoria(categoria);

        try{
            // Guardo los alojamientos
            if (!alojamientos.isEmpty()){
                // Obtengo alojamiento segun id
                Set<Alojamiento> alojamientosAgregados = new HashSet<>();
                for (Long id : alojamientos){
                    Alojamiento alojamientoEncontrado = mapper.convertValue(alojamientoService.buscarPorId(id), Alojamiento.class);
                    alojamientosAgregados.add(alojamientoEncontrado);
                }

                tourDTO.setAlojamientos(alojamientosAgregados);
            }

            // Guardo actividades
            if (!actividades.isEmpty()){
                // Obtengo actividad segun id
                Set<Actividad> actividadesAgregadas = new HashSet<>();
                for (Long id : actividades){
                    Actividad actividadEncontrada = mapper.convertValue(actividadService.buscarPorId(id), Actividad.class);
                    actividadesAgregadas.add(actividadEncontrada);
                }
                tourDTO.setActividades(actividadesAgregadas);
            }

            //Guardo las imagenes en carpeta api/images
            if (!imagenes.isEmpty()) {
                Set<Imagen> pathImagenes = imagenService.agregar(imagenes);
                tourDTO.setImagenes(pathImagenes);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(tourService.agregar(tourDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        tourService.eliminar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Tour eliminado correctamente");
        return respuesta;
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Tour tour) throws BadRequestException{
        /*// Actualizo actividad
        Set<Actividad> actividades = actividadService.agregarTodos(tour.getActividades());
        tour.setActividades(actividades);

        // Actualizo actividad
        Set<Alojamiento> alojamientos = alojamientoService.agregarTodos(tour.getAlojamientos());
        tour.setAlojamientos(alojamientos);*/

        return ResponseEntity.ok(tourService.modificar(tour));
    }

    @GetMapping(path = "/{id}")
    public Optional<TourDTO> buscarPorId(@PathVariable Long id) throws Exception{
        return tourService.buscarPorId(id);
    }

    @GetMapping
    public Collection<TourDTO> listarTodos(){
        return tourService.listarTodos();
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN TOUR: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
