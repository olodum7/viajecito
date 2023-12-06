package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ReservaDTO;
import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.*;
import com.viajecito.api.repository.IAlojamientoRepository;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.repository.ISalidaRepository;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.service.IReservaService;
import com.viajecito.api.service.ISalidaService;
import com.viajecito.api.service.ITourService;
import com.viajecito.api.service.impl.ImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.viajecito.api.service.impl.StorageService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/tour")
public class TourController {

    @Autowired
    private ITourService tourService;

    @Autowired
    private ITourRepository tourRepository;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    private IAlojamientoRepository alojamientoRepository;

    @Autowired
    private ISalidaService salidaService;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private StorageService storageService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("titulo") String titulo,
                                     @RequestParam("subtitulo") String subtitulo,
                                     @RequestParam("precioBase") Double precioBase,
                                     @RequestParam("precioAdulto") Double precioAdulto,
                                     @RequestParam("precioMenor") Double precioMenor,
                                     @RequestParam("categoria") Long categoriaId,
                                     @RequestParam("rating") String rating,
                                     @RequestParam("duracion") Integer duracion,
                                     @RequestParam("dificultad") TourDificultad dificultad,
                                     @RequestParam("salida[dias]") String dias,
                                     @RequestParam("salida[fechaDesde]")@DateTimeFormat(pattern = "dd/MM/yyyy")LocalDate fechaDesde,
                                     @RequestParam("salida[fechaHasta]")@DateTimeFormat(pattern = "dd/MM/yyyy")LocalDate fechaHasta,
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

        try {
            /************* VALIDACION DE CAMPOS *************/
            if (titulo == null || subtitulo == null || precioBase == null || categoriaId == null ||
                    duracion == null || dificultad == null || (imagenes == null || imagenes.isEmpty())) {
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Todos los campos son obligatorios."));
            }

            if (titulo.isEmpty() || subtitulo.isEmpty() || precioBase.isNaN() || duracion == 0 ) {
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "Los campos no pueden quedar vacíos."));
            }

            tour.setTitulo(titulo);
            tour.setSubtitulo(subtitulo);
            tour.setPrecioBase(precioBase);
            tour.setPrecioAdulto(precioAdulto);
            tour.setPrecioMenor(precioMenor);

            /**** Categoria ****/
            Categoria categoria = categoriaRepository.findById(categoriaId).orElse(null);
            if (categoria == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "La categoria seleccionada no existe."));
            tour.setCategoria(categoria);

            tour.setRating(rating);
            tour.setDuracion(duracion);
            tour.setDificultad(dificultad);
            tour.setPasajes(pasajes);
            tour.setTransporte(transporte);
            tour.setTraslado(traslado);
            tour.setGuia(guia);
            tour.setItinerario(itinerario);

            /**** Alojamiento ****/
            Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElse(null);
            if (alojamiento == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "El alojamiento seleccionado no existe."));
            tour.setAlojamiento(alojamiento);

            tour.setEntradas(entradas);

            /**** Si las imagenes no existen, se agregan ****/
            if (!imagenes.isEmpty()) {
                Integer contador = 1;
                for (MultipartFile imagen : imagenes) {
                    String originalFilename = imagen.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String descriptiveName = "tour_" + titulo.replaceAll("\\s+", "_").toLowerCase();
                    String keyName = descriptiveName + "_" + (contador++) + extension;

                    if (!imagenService.existePorNombre(keyName)) {
                        storageService.uploadFile(keyName, imagen);
                        Imagen img = new Imagen();
                        img.setNombre(originalFilename);
                        img.setUrl("https://1023c01-grupo1-s3.s3.amazonaws.com/" + keyName);
                        img = imagenService.agregar(img);
                        imagenesTour.add(img);
                    }
                }
                tour.setImagenes(imagenesTour);
            }

            /**** Salidas ****/
            Salida salida = new Salida();
            salida.setActivo(true);
            salida.setDias(dias);
            salida.setFechaDesde(fechaDesde);
            salida.setFechaHasta(fechaHasta);
            salida.setTour(tour);

            // Agregar salida al tour y guardar
            Set<Salida> salidas = new HashSet<>();
            salidas.add(salida);
            tour.setSalidas(salidas);

            return ResponseEntity.ok(new MensajeRespuesta("ok", tourService.agregar(tour).getTitulo() + " agregado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        try {
            tourService.eliminar(id);
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "No es posible eliminar el tour: " + e.getMessage()));
        }
        return ResponseEntity.status(HttpStatus.OK).body("Tour eliminado correctamente.");
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestParam("id") Long id,
                                       @RequestParam("precioBase") Double precioBase,
                                       @RequestParam("precioAdulto") Double precioAdulto,
                                       @RequestParam("precioMenor") Double precioMenor,
                                       @RequestParam("categoria") Long categoriaId,
                                       //@RequestParam("rating") String rating,
                                       @RequestParam("duracion") Integer duracion,
                                       @RequestParam("dificultad") TourDificultad dificultad
                                       //@RequestParam("salida[dias]") String dias,
                                       //@RequestParam("salida[fechaDesde]")@DateTimeFormat(pattern = "dd/MM/yyyy")LocalDate fechaDesde,
                                       //@RequestParam("salida[fechaHasta]")@DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate fechaHasta,
                                       //@RequestParam("pasajes") Boolean pasajes,
                                       //@RequestParam("transporte") String transporte,
                                       //@RequestParam("traslado") Boolean traslado,
                                       //@RequestParam("entradas") String entradas,
                                       //@RequestParam("guia") Boolean guia_es,
                                       //@RequestParam("itinerario") String itinerario,
                                       //@RequestParam("alojamiento") Long alojamientoId,
                                       //@RequestPart("imagenes") List<MultipartFile> imagenes
                                       ) throws BadRequestException, IOException {

        try {
            Tour tour = tourRepository.findById(id).orElseThrow();
            Categoria categoria = categoriaRepository.findById(categoriaId).orElseThrow();
            //Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElseThrow();

            tour.setPrecioBase(precioBase);
            tour.setPrecioAdulto(precioAdulto);
            tour.setPrecioMenor(precioMenor);
            tour.setCategoria(categoria);
            //tour.setRating(rating);
            tour.setDuracion(duracion);

            /** Obtengo el codigo de la descripcion para dificultad */
            //TourDificultad dificultad = TourDificultad.fromDescripcion(dificultadDesc);
            tour.setDificultad(dificultad);

            /**** Salida activa ****/
            /*Salida salida = new Salida();
            salida.setActivo(true);
            salida.setDias(dias);
            salida.setFechaDesde(fechaDesde);
            salida.setFechaDesde(fechaHasta);
            salida.setTour(tour);

            Set<Salida> salidas = new HashSet<>();*/
            /** Desactivo todas las salidas del tour y activo la que se paso **/
            /*for (Salida s : tour.getSalidas()){
                s.setActivo(false);
                salidaService.modificar(s);
            }*/

            /*salidas.add(salida);
            tour.setSalidas(salidas);
            tour.setPasajes(pasajes);
            tour.setTransporte(transporte);
            tour.setTraslado(traslado);
            tour.setEntradas(entradas);
            tour.setGuia(guia_es);
            tour.setItinerario(itinerario);
            tour.setAlojamiento(alojamiento);*/

            /** Elimino las imagenes existentes del tour y agrego las nuevas **/
            //tour.getImagenes().clear();
            //Set<Imagen> imagenesTour = new HashSet<>(tour.getImagenes()); // Imágenes existentes

            /*if (!imagenes.isEmpty()) {
                Integer contador = imagenesTour.size() + 1;
                for (MultipartFile imagen : imagenes) {
                    String originalFilename = imagen.getOriginalFilename();
                    List<Imagen> imagenesExistentes = imagenService.buscarPorNombre(originalFilename);
                    if (imagenesExistentes.isEmpty()) {
                        String descriptiveName = "tour_" + tour.getTitulo().replaceAll("\\s+", "_").toLowerCase();
                        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                        String keyName = descriptiveName + "_" + (contador++) + extension;

                        storageService.uploadFile(keyName, imagen);
                        Imagen img = new Imagen();
                        img.setNombre(originalFilename);
                        img.setUrl("https://1023c01-grupo1-s3.s3.amazonaws.com/" + keyName);
                        img = imagenService.agregar(img); // Agregar la imagen a la base de datos
                        imagenesTour.add(img);
                    } else {
                        imagenesTour.add(imagenesExistentes.get(0)); // Reutiliza la instancia existente
                    }
                }
            }*/

            /*tour.setImagenes(imagenesTour);*/

            /* Viejo en BD */
            /*tour.getImagenes().clear();
            Set<Imagen> nuevasImagenes = imagenService.agregar(imagenes);*/

            //tour.setImagenes(nuevasImagenes);

            return ResponseEntity.ok(new MensajeRespuesta("ok", tourService.modificar(tour).getTitulo() + " modificado correctamente."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
        /*catch (IOException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }*/
    }

    @GetMapping(path = "/{id}")
    public TourDTO buscarPorId(@PathVariable Long id) throws BadRequestException {
        return tourService.buscarPorId(id);
    }

    @GetMapping(path = "/disponibles")
    public Collection<TourDTO> buscarDisponibles(@RequestParam("fechaSalida") String fechaSalida) throws BadRequestException {
        LocalDate fechaSalidaLocalDate = LocalDate.parse(fechaSalida);
        return tourService.listarDisponibles(fechaSalidaLocalDate);
    }

    @GetMapping
    public Collection<TourDTO> listarTodos() throws BadRequestException {
        return tourService.listarTodos();
    }
}