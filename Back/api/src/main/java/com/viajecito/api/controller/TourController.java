package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.*;
import com.viajecito.api.repository.IAlojamientoRepository;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.service.ITourService;
import com.viajecito.api.service.impl.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@CrossOrigin
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
    private ITourRepository tourRepository;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("titulo") String titulo,
                                     @RequestParam("subtitulo") String subtitulo,
                                     @RequestParam("precio") Double precio,
                                     @RequestParam("categoria") Long categoriaId,
                                     @RequestParam("rating") String rating,
                                     @RequestParam("duracion") String duracion,
                                     @RequestParam("dificultad") TourDificultad dificultad,
                                     @RequestParam("salidas") String salidas,
                                     @RequestParam("pasajes") Boolean pasajes,
                                     @RequestParam("transporte") String transporte,
                                     @RequestParam("traslado") Boolean traslado,
                                     @RequestParam("entradas") String entradas,
                                     @RequestParam("guia") Boolean guia,
                                     @RequestParam("itinerario") String itinerario,
                                     @RequestParam("alojamiento") Long alojamientoId,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException{

        Tour tour = new Tour();
        Set<Imagen> imagenesTour = new HashSet<>();
        Set<Long> imagenesId = new HashSet<>();

        try {
            /************* VALIDACION DE CAMPOS *************/
            if (titulo == null || subtitulo == null || precio == null || categoriaId == null ||
                    duracion == null || dificultad == null || (imagenes == null || imagenes.isEmpty())) {
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Todos los campos son obligatorios."));
            }

            if (titulo.isEmpty() || subtitulo.isEmpty() || precio.isNaN() || duracion.isEmpty() ) {
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Los campos no pueden quedar vacíos."));
            }

            tour.setTitulo(titulo);
            tour.setSubtitulo(subtitulo);
            tour.setPrecio(precio);

            /**** Categoria ****/
            Categoria categoria = categoriaRepository.findById(categoriaId).orElse(null);
            if (categoria == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "La categoria seleccionada no existe."));
            tour.setCategoria(categoria);

            tour.setRating(rating);
            tour.setDuracion(duracion);
            tour.setDificultad(dificultad);
            tour.setSalidas(salidas);
            tour.setPasajes(pasajes);
            tour.setTransporte(transporte);
            tour.setTraslado(traslado);
            tour.setGuia(guia);
            tour.setItinerario(itinerario);

            /**** Alojamiento ****/
            Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElse(null);
            if (alojamiento == null)
                return ResponseEntity.ok(new MensajeRespuesta("error", "El alojamiento seleccionado no existe."));
            tour.setAlojamiento(alojamiento);

            tour.setEntradas(entradas);

            /**** Si las imagenes no existen, se agregan ****/
            if (!imagenes.isEmpty()) {
                imagenesTour = imagenService.agregar(imagenes);
                tour.setImagenes(imagenesTour);
            }
            return ResponseEntity.ok(new MensajeRespuesta("ok", tourService.agregar(tour).getTitulo() + " agregado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
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
    public ResponseEntity<?> modificar(@RequestParam("id") Long id,
                                       @RequestParam("precio") Double precio,
                                       @RequestParam("categoria") Long categoriaId,
                                       @RequestParam("rating") String rating,
                                       @RequestParam("duracion") String duracion,
                                       @RequestParam("dificultad") String dificultadStr,
                                       @RequestParam("salidas") String salidas,
                                       @RequestParam(value = "pasajes", required = false) String pasajesStr,
                                       @RequestParam("transporte") String transporte,
                                       @RequestParam(value = "traslado", required = false) String trasladoStr,
                                       @RequestParam(value = "entradas", required = false) String entradasStr,
                                       @RequestParam(value = "guia", required = false) String guiaStr,
                                       @RequestParam("itinerario") String itinerario,
                                       @RequestParam("alojamiento") Long alojamientoId,
                                       @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException, IOException {

        try {
            Tour tour = tourRepository.findById(id).orElseThrow();
            Categoria categoria = categoriaRepository.findById(categoriaId).orElseThrow();
            Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElseThrow();

            TourDificultad dificultad = TourDificultad.valueOf(dificultadStr);
            Boolean traslado = Boolean.valueOf(trasladoStr);
            Boolean pasajes = Boolean.valueOf(pasajesStr);
            Boolean entradas = Boolean.valueOf(entradasStr);
            Boolean guia = Boolean.valueOf(guiaStr);

            tour.setPrecio(precio);
            tour.setCategoria(categoria);
            tour.setRating(rating);
            tour.setDuracion(duracion);
            tour.setDificultad(dificultad);
            tour.setSalidas(salidas);
            tour.setPasajes(pasajes);
            tour.setTransporte(transporte);
            tour.setTraslado(traslado);
            tour.setEntradas(String.valueOf(entradas));
            tour.setGuia(guia);
            tour.setItinerario(itinerario);
            tour.setAlojamiento(alojamiento);

            /** Elimino las imagenes existentes del tour y agrego las nuevas **/
            /*for (Imagen imagenExistente : tour.getImagenes())
                imagenService.eliminar(imagenExistente.getId());*/
            tour.getImagenes().clear();
            Set<Imagen> nuevasImagenes = imagenService.agregar(imagenes);

            tour.setImagenes(nuevasImagenes);

            tourService.modificar(tour);
            return ResponseEntity.ok(new MensajeRespuesta("ok", tourService.modificar(tour).getTitulo() + " modificado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
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