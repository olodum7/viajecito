package com.viajecito.api.repository;

import com.viajecito.api.model.Reserva;
import com.viajecito.api.model.Tour;
import com.viajecito.api.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

@Repository
public interface IReservaRepository extends JpaRepository<Reserva, Long> {
    Optional<Reserva> findByFechaSalidaAndTour(LocalDate fechaSalida, Tour tour);
    Collection<Reserva> findByUsuario(Usuario usuario);
    Collection<Reserva> findByTour(Tour tour);
}