package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.ActividadEstado;
import com.viajecito.api.service.IActividadService;
import com.viajecito.api.service.IImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/actividad")
public class ActividadController {

    @Autowired
    private IActividadService actividadService;

    @Autowired
    private IImagenService imagenService;

    @Autowired
    ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("nombre") String nombre,
                                     @RequestParam("fechaHora") @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm") LocalDateTime fechaHora,
                                     @RequestParam("estado") ActividadEstado estado) throws BadRequestException{

        ActividadDTO actividadDTO = new ActividadDTO();
        actividadDTO.setNombre(nombre);
        actividadDTO.setFechaHora(fechaHora);
        actividadDTO.setEstado(estado);

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
    public Collection<Actividad> listarTodos() throws BadRequestException{
        return actividadService.listarTodos();
    }
}
