package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ReservaDTO;
import com.viajecito.api.dto.ReservaDTOMin;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Reserva;
import com.viajecito.api.model.Tour;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.repository.IReservaRepository;
import com.viajecito.api.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class ReservaService implements IReservaService {
    @Autowired
    private IReservaRepository reservaRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public ReservaDTO agregar(Reserva reserva) throws BadRequestException {
        /************* VALIDACION DE CAMPOS *************/
        /**** Controlo ingreso repetido por fecha y tour ****/
        if(reservaRepository.findByFechaSalidaAndTour(reserva.getFechaSalida(), reserva.getTour()).isPresent())
            throw new BadRequestException("Ya existe una reserva para la fecha de salida y Tour seleccionados");
        return toDTO(reservaRepository.save(reserva));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        /**** Controlo que exista ****/
        if (reservaRepository.findById(id).isPresent())
            throw new BadRequestException("La reserva a eliminar no existe.");
        reservaRepository.deleteById(id);
    }

    @Override
    public ReservaDTO modificar(Reserva reserva) {
        return toDTO(reservaRepository.save(reserva));
    }

    @Override
    public Reserva buscarPorId(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @Override
    public Collection<ReservaDTO> listarTodasPorUsuario(Usuario usuario) {
        Collection<ReservaDTO> collection = new ArrayList<>();
        for (Reserva reserva : reservaRepository.findByUsuario(usuario))
            collection.add(toDTO(reserva));
        return collection;
    }

    @Override
    public Collection<ReservaDTOMin> listarTodasPorTour(Tour tour) {
        Collection<ReservaDTOMin> collection = new ArrayList<>();
        for (Reserva reserva : reservaRepository.findByTour(tour))
            collection.add(toDTOMin(reserva));
        return collection;
    }

    private ReservaDTO toDTO(Reserva r){
        ReservaDTO dto = new ReservaDTO();
        dto.setIdReserva(r.getId());
        dto.setFechaSalida(r.getFechaSalida());
        dto.setTourId(r.getTour().getId());
        dto.setAcompaniantes_mayores(r.getAcompaniantes_mayores());
        dto.setAcompaniantes_menores(r.getAcompaniantes_menores());
        return dto;
    }

    private ReservaDTOMin toDTOMin(Reserva r){
        ReservaDTOMin dto = new ReservaDTOMin();
        dto.setFechaSalida(r.getFechaSalida());
        dto.setUsuario(r.getUsuario().getEmail());
        dto.setAcompaniantes_mayores(r.getAcompaniantes_mayores());
        dto.setAcompaniantes_menores(r.getAcompaniantes_menores());
        return dto;
    }
}
