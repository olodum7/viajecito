package com.viajecito.api.controller;

import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.service.IAlojamientoService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/alojamiento")
public class AlojamientoController {
    private static final Logger log = Logger.getLogger(AlojamientoController.class);

    @Autowired
    IAlojamientoService alojamientoService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody AlojamientoDTO alojamientoDTO) throws BadRequestException {
        return ResponseEntity.ok(alojamientoService.agregar(alojamientoDTO));
    }

    @GetMapping
    public Collection<AlojamientoDTO> listarTodos() throws BadRequestException{
        return alojamientoService.listarTodos();
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
