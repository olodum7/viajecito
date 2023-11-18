package com.viajecito.api.controller;


import com.viajecito.api.dto.FechaDisponibleDTO;
import com.viajecito.api.service.impl.FechaDisponibleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/fechas-disponibles")
public class FechaDisponibleController {

    private final FechaDisponibleService fechaDisponibleService;

    @Autowired
    public FechaDisponibleController(FechaDisponibleService fechaDisponibleService) {
        this.fechaDisponibleService = fechaDisponibleService;
    }

    @GetMapping
    public ResponseEntity<List<FechaDisponibleDTO>> obtenerFechasDisponibles() {
        List<FechaDisponibleDTO> fechasDisponibles = fechaDisponibleService.obtenerFechasDisponibles();
        return ResponseEntity.ok(fechasDisponibles);
    }
}