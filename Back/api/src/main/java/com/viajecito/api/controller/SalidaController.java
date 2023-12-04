package com.viajecito.api.controller;

import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Salida;
import com.viajecito.api.service.impl.SalidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salidas")
public class SalidaController {

    @Autowired
    private SalidaService salidaService;

    @PostMapping
    public ResponseEntity<SalidaDTO> agregarSalida(@RequestBody Salida salida) {
        SalidaDTO nuevaSalida = salidaService.agregar(salida);
        return nuevaSalida != null ? ResponseEntity.ok(nuevaSalida) : ResponseEntity.badRequest().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalidaDTO> obtenerSalidaPorId(@PathVariable Long id) {
        try {
            SalidaDTO salida = salidaService.buscarPorId(id);
            return ResponseEntity.ok(salida);
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<SalidaDTO>> obtenerTodasLasSalidas() {
        List<SalidaDTO> salidas = salidaService.obtenerTodas();
        return ResponseEntity.ok(salidas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalidaDTO> actualizarSalida(@PathVariable Long id, @RequestBody Salida salida) throws BadRequestException {
        SalidaDTO salidaActualizada = salidaService.actualizar(id, salida);
        return salidaActualizada != null ? ResponseEntity.ok(salidaActualizada) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarSalida(@PathVariable Long id) {
        boolean eliminado = salidaService.eliminar(id);
        return eliminado ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
