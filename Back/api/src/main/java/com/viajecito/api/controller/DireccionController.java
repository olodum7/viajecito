package com.viajecito.api.controller;

import com.viajecito.api.dto.DireccionDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.service.IDireccionService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/direccion")
public class DireccionController {
    private static final Logger log = Logger.getLogger(DireccionController.class);

    @Autowired
    IDireccionService direccionService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody DireccionDTO direccionDTO) throws BadRequestException {
        return ResponseEntity.ok(direccionService.agregar(direccionDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        ResponseEntity<String> respuesta = null;
        direccionService.eliminar(id);
        respuesta = ResponseEntity.status(HttpStatus.OK).body("INFORMACIÓN: Direccion eliminada correctamente");
        return respuesta;
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Direccion direccion) throws BadRequestException {
        return ResponseEntity.ok(direccionService.modificar(direccion));
    }

    @GetMapping(path = "/{id}")
    public Optional<DireccionDTO> buscarPorId(@PathVariable Long id) throws Exception {
        return direccionService.buscarPorId(id);
    }

    @GetMapping
    public Collection<DireccionDTO> listarTodos() throws BadRequestException {
        return direccionService.listarTodos();
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarBadRequestException(BadRequestException exception){
        log.error("ERROR EN DIRECCION: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }
}
