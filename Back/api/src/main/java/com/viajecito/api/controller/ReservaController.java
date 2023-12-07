package com.viajecito.api.controller;

import com.viajecito.api.dto.ReservaDTO;
import com.viajecito.api.dto.ReservaDTOMin;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.MensajeRespuesta;
import com.viajecito.api.model.Reserva;
import com.viajecito.api.model.Tour;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.repository.IUsuarioRepository;
import com.viajecito.api.service.IReservaService;
import com.viajecito.api.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.DateFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;

@CrossOrigin
@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private IReservaService reservaService;

    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Autowired
    private ITourRepository tourRepository;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestParam("fechaSalida")@DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate fechaSalida,
                                     @RequestParam("username") String email,
                                     @RequestParam("mayores") Integer mayores,
                                     @RequestParam("menores") Integer menores,
                                     @RequestParam("tour") Long idTour) throws BadRequestException {

        Reserva reserva = new Reserva();

        try {
            reserva.setFechaSalida(fechaSalida);
            reserva.setAcompaniantes_mayores(mayores);
            reserva.setAcompaniantes_menores(menores);

            /**** Usuario ****/
            Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
            if (usuario == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "El usuario de la reserva no existe."));
            reserva.setUsuario(usuario);

            /**** Tour ****/
            Tour tour = tourRepository.findById(idTour).orElse(null);
            if (tour == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "El tour seleccionado en la reserva no existe."));
            reserva.setTour(tour);

            reservaService.agregar(reserva);
            return ResponseEntity.ok(new MensajeRespuesta("ok", "Reserva realizada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        try {
            reservaService.eliminar(id);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible eliminar la reserva: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Reserva eliminada correctamente.");
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestParam("id") Long id,
                                       @RequestParam("fechaSalida") LocalDate fechaSalida,
                                       @RequestParam("mayores") Integer mayores,
                                       @RequestParam("menores") Integer menores){
        try {
            Reserva reserva = reservaService.buscarPorId(id);
            if (reserva == null)
                return ResponseEntity.badRequest().body(new MensajeRespuesta("error", "La reserva no existe."));

            reserva.setFechaSalida(fechaSalida);
            reserva.setAcompaniantes_mayores(mayores);
            reserva.setAcompaniantes_menores(menores);

            reservaService.modificar(reserva);
            return ResponseEntity.ok(new MensajeRespuesta("ok", " Reserva modificada correctamente."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
    }

    @PostMapping("/reservations")
    public Collection<ReservaDTO> listarTodasPorUsuario(@RequestParam("email") String email) {
        Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
        return reservaService.listarTodasPorUsuario(usuario);
    }

    @GetMapping(path = "/tour{idTour}")
    public Collection<ReservaDTOMin> listarTodasPorTour(@PathVariable Long idTour){
        Tour tour = tourRepository.findById(idTour).orElse(null);
        return reservaService.listarTodasPorTour(tour);
    }

}
