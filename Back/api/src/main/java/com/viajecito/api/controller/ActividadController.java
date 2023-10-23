package com.viajecito.api.controller;

import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.repository.IActividadRepository;
import com.viajecito.api.service.IActividadService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/actividad")
public class ActividadController {
    private static final Logger log = Logger.getLogger(ActividadController.class);

    @Autowired
    IActividadService actividadService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody ActividadDTO actividadDTO) throws BadRequestException{
        return ResponseEntity.ok(actividadService.agregar(actividadDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException{
        ResponseEntity<String> respuesta = null;
        actividadService.borrar(id);
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
        log.error("ERROR: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
