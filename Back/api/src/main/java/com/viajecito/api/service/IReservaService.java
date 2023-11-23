package com.viajecito.api.service;

import com.viajecito.api.dto.ReservaDTO;
import com.viajecito.api.dto.ReservaDTOMin;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Reserva;
import com.viajecito.api.model.Tour;
import com.viajecito.api.model.Usuario;

import java.util.Collection;

public interface IReservaService {
    ReservaDTO agregar(Reserva reserva) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    ReservaDTO modificar(Reserva reserva);
    Reserva buscarPorId(Long id);
    Collection<ReservaDTO> listarTodasPorUsuario(Usuario usuario);
    Collection<ReservaDTOMin> listarTodasPorTour(Tour tour);

}
