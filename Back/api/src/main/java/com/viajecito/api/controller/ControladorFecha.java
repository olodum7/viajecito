package com.viajecito.api.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.viajecito.api.model.FechaDisponible;
import java.util.List;
import java.util.ArrayList;


@RestController
@RequestMapping("/api/fechas")
@RequiredArgsConstructor
public class ControladorFecha {

    // Logic to retrieve available dates from your database or source
    // This logic would typically be handled by a service class; consider injecting a service here.
    @GetMapping
    public List<FechaDisponible> obtenerFechasDisponibles() {
        List<FechaDisponible> fechasDisponibles = new ArrayList<>();
        fechasDisponibles.add(new FechaDisponible("2023-11-16", true));
        fechasDisponibles.add(new FechaDisponible("2023-11-17", false));
        // Add more dates...

        return fechasDisponibles;
    }


    @PostMapping("/reservar")
    public ResponseEntity<String> reservarFecha(@RequestBody String fechaSeleccionada) {
        // Logic to book the selected date
        return ResponseEntity.ok("Fecha reservada: " + fechaSeleccionada);
    }
}
