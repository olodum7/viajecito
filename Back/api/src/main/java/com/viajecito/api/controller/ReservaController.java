package com.viajecito.api.controller;

import com.viajecito.api.model.AlojamientoTipo;
import com.viajecito.api.model.Reserva;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
public class ReservaController {

    @PostMapping("/reservar")
    public ResponseEntity<String> reservarFecha(@RequestBody Reserva reserva) {
        LocalDateTime fechaHoraSalida = reserva.getFechaHoraSalida();

        boolean isReservationSuccessful = makeReservation(fechaHoraSalida, reserva.getAlojamientoTipo());
        if (isReservationSuccessful) {
            return ResponseEntity.ok("Fecha reservada: " + fechaHoraSalida.toString());
        } else {
            return ResponseEntity.badRequest().body("La fecha seleccionada no está disponible para reserva.");
        }
    }

    private boolean makeReservation(LocalDateTime fechaHoraSalida, AlojamientoTipo alojamientoTipo) {

        return isValidDateTime(fechaHoraSalida) && alojamientoTipo != null;
    }

    private boolean isValidDateTime(LocalDateTime fechaHoraSalida) {
        return fechaHoraSalida != null && fechaHoraSalida.isAfter(LocalDateTime.now());
    }
}
