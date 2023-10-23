package com.viajecito.api.controller;

import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Tour;
import com.viajecito.api.service.ITourService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/tour")
public class TourController {
    private static final Logger log = Logger.getLogger(TourController.class);

    @Autowired
    ITourService tourService;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody TourDTO tourDTO) throws BadRequestException{
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
