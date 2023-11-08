package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.*;
import com.viajecito.api.repository.IAlojamientoRepository;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.service.ITourService;
import com.viajecito.api.service.impl.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/tour")
public class TourController {

    @Autowired
    private ITourService tourService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    private IAlojamientoRepository alojamientoRepository;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("titulo") String titulo,
                                     @RequestParam("subtitulo") String subtitulo,
                                     @RequestParam("precio") Double precio,
                                     @RequestParam("categoria") Long categoriaId,
                                     @RequestParam("duracion") String duracion,
                                     @RequestParam("dificultad") TourDificultad dificultad,
                                     @RequestParam("transporte") String transporte,
                                     @RequestParam("traslado") Boolean traslado,
                                     @RequestParam("entradas") String entradas,
                                     @RequestParam("guia") Boolean guia_es,
                                     @RequestParam("alojamiento") Long alojamientoId,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException{

        Tour tour = new Tour();
        Set<Imagen> imagenesTour = new HashSet<>();
        Set<Long> imagenesId = new HashSet<>();

        try {
            /************* VALIDACION DE CAMPOS *************/
            if (titulo == null || subtitulo == null || precio == null || categoriaId == null ||
                    duracion == null || dificultad == null || (imagenes == null || imagenes.isEmpty())) {
                throw new BadRequestException("Todos los campos son obligatorios.");
            }

            if (titulo.isEmpty() || subtitulo.isEmpty() || precio.isNaN() || duracion.isEmpty() ) {
                throw new BadRequestException("Los campos no pueden quedar vacíos.");
            }

            tour.setTitulo(titulo);
            tour.setSubtitulo(subtitulo);
            tour.setPrecio(precio);

            /**** Categoria ****/
            Categoria categoria = categoriaRepository.findById(categoriaId).orElse(null);
            if (categoria == null)
                throw new BadRequestException("La categoria seleccionada no existe.");
            tour.setCategoria(categoria);

            tour.setDuracion(duracion);
            tour.setDificultad(dificultad);
            tour.setTransporte(transporte);
            tour.setTraslado(traslado);
            tour.setGuia_es(guia_es);

            /**** Alojamiento ****/
            Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElse(null);
            if (alojamiento == null)
                throw new BadRequestException("El alojamiento seleccionado no existe.");
            tour.setAlojamiento(alojamiento);

            tour.setEntradas(entradas);

            /**** Si las imagenes no existen, se agregan ****/
            if (!imagenes.isEmpty()) {
                imagenesTour = imagenService.agregar(imagenes);
                tour.setImagenes(imagenesTour);
            }
            return ResponseEntity.ok(tourService.agregar(tour));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        try {
            tourService.eliminar(id);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible eliminar el tour: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Tour eliminado correctamente.");
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Tour tour) throws BadRequestException{
        try{
            tourService.modificar(tour);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible modificar el tour: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Tour modificado correctamente.");
    }

    @GetMapping(path = "/{id}")
    public TourDTO buscarPorId(@PathVariable Long id) throws BadRequestException {
        return tourService.buscarPorId(id);
    }

    @GetMapping
    public Collection<TourDTO> listarTodos(){
        return tourService.listarTodos();
    }
}
