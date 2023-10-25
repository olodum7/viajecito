package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.service.IAlojamientoService;
import com.viajecito.api.service.impl.DireccionService;
import com.viajecito.api.service.impl.ImagenService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/alojamiento")
public class AlojamientoController {
    private static final Logger log = Logger.getLogger(AlojamientoController.class);

    @Autowired
    private IAlojamientoService alojamientoService;

    @Autowired
    private DireccionService direccionService;

    @Autowired
    private ImagenService imagenService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre") String nombre,
                                     @RequestParam("direcciones") List<Long> direcciones,
                                     @RequestPart("imagenes") List<MultipartFile> imagenes ) throws BadRequestException {

        AlojamientoDTO alojamientoDTO = new AlojamientoDTO();
        alojamientoDTO.setNombre(nombre);

        try {
            // Guardo las direcciones en caso de que no esten en la bd
            if(!direcciones.isEmpty()){
                // Obtengo el objeto Direccion para la id brindada
                Set<Direccion> dirrecionesAgregadas = new HashSet<Direccion>();
                for (Long idDireccion : direcciones){
                    Direccion direccionEncontrada = mapper.convertValue(direccionService.buscarPorId( idDireccion ) , Direccion.class);
                    dirrecionesAgregadas.add(direccionEncontrada);
                }
                alojamientoDTO.setDirecciones(dirrecionesAgregadas);
            }

            //Guardo las imagenes en carpeta api/images
            if (!imagenes.isEmpty()) {
                Set<Imagen> pathImagenes = imagenService.agregar(imagenes);
                alojamientoDTO.setImagenes(pathImagenes);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
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
        // Modificando las direcciones
        Set<Direccion> dirreciones = direccionService.agregarTodas(alojamiento.getDirecciones());
        alojamiento.setDirecciones(dirreciones);

        return ResponseEntity.ok(alojamientoService.modificar(alojamiento));
    }

    @GetMapping(path = "/{id}")
    public Optional<AlojamientoDTO> buscarPorId(@PathVariable Long id) throws Exception{
        return alojamientoService.buscarPorId(id);
    }

    @GetMapping
    public Collection<AlojamientoDTO> listarTodos() throws BadRequestException{
        return alojamientoService.listarTodos();
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN ALOJAMIENTO: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
