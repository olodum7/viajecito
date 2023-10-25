package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.dto.DireccionDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.ActividadEstado;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.repository.IActividadRepository;
import com.viajecito.api.repository.IImagenRepository;
import com.viajecito.api.service.IActividadService;
import com.viajecito.api.service.IDireccionService;
import com.viajecito.api.service.IImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;

@RestController
@RequestMapping("/actividad")
public class ActividadController {
    private static final Logger log = Logger.getLogger(ActividadController.class);

    @Autowired
    private IActividadService actividadService;

    @Autowired
    private IImagenService imagenService;

    @Autowired
    private IDireccionService direccionService;

    @Autowired
    ObjectMapper mapper;
    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre") String nombre,
                                     @RequestParam("fechaHora") @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm") LocalDateTime fechaHora,
                                     @RequestParam("precio") Double precio,
                                     @RequestParam("estado") ActividadEstado estado,
                                     @RequestParam("direcciones") List<Long> direcciones,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes) throws BadRequestException{

        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setNombre(nombre);
        actividadDTO.setFechaHora(fechaHora);
        actividadDTO.setPrecio(precio);
        actividadDTO.setEstado(estado);

        try {
            // Guardo las direcciones en caso de que no esten en la bd
            if(!direcciones.isEmpty()){
                // Obtengo el objeto Direccion para la id brindada
                Set<Direccion> dirrecionesAgregadas = new HashSet<Direccion>();
                for (Long idDireccion : direcciones){
                    Direccion direccionEncontrada = mapper.convertValue(direccionService.buscarPorId( idDireccion ) , Direccion.class);
                    dirrecionesAgregadas.add(direccionEncontrada);
                }
                actividadDTO.setDirecciones(dirrecionesAgregadas);
            }

            //Guardo las imagenes en carpeta api/images
            if (!imagenes.isEmpty()) {
                Set<Imagen> pathImagenes = imagenService.agregar(imagenes);
                actividadDTO.setImagenes(pathImagenes);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(actividadService.agregar(actividadDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        actividadService.eliminar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Actividad eliminada correctamente");
        return respuesta;
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Actividad actividad) throws BadRequestException{
        return ResponseEntity.ok(actividadService.modificar(actividad));
    }

    @GetMapping(path = "/{id}")
    public Optional<ActividadDTO> buscarPorId(@PathVariable Long id) throws Exception{
        return actividadService.buscarPorId(id);
    }

    @GetMapping
    public Collection<ActividadDTO> listarTodos() throws BadRequestException{
        return actividadService.listarTodos();
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN ACTIVIDAD: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
