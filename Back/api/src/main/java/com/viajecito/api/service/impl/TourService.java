package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.model.Tour;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TourService implements ITourService {
    @Autowired
    private ITourRepository tourRepository;

   /* @Autowired
    private ActividadService actividadService;

    @Autowired
    private AlojamientoService alojamientoService;*/

    @Autowired
    ObjectMapper mapper;

    @Transactional
    @Override
    public TourDTO agregar(TourDTO tourDTO) throws BadRequestException {
        // Agregando las actividades
        /*Set<Actividad> actividades = actividadService.agregarTodos(tourDTO.getActividades());
        tourDTO.setActividades(actividades);

        // Agregando los alojamientos
        Set<Alojamiento> alojamientos = alojamientoService.agregarTodos(tourDTO.getAlojamientos());
        tourDTO.setAlojamientos(alojamientos);*/

        if (tourRepository.findByTitulo(tourDTO.getTitulo()).isPresent())
            throw new BadRequestException("ACCIÓN NO REALIZADA: Ya existe un tour con los datos ingresados");
        return toDTO(tourRepository.save(toModel(tourDTO)));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        if(buscarPorId(id).isPresent())
            tourRepository.deleteById(id);
    }

    @Transactional
    @Override
    public TourDTO modificar(Tour tour) throws BadRequestException {
        /*// Modificando las actividades
        Set<Actividad> actividades = actividadService.agregarTodos(tour.getActividades());
        tour.setActividades(actividades);

        // Modificando los alojamientos
        Set<Alojamiento> alojamientos = alojamientoService.agregarTodos(tour.getAlojamientos());
        tour.setAlojamientos(alojamientos);*/

        if (tourRepository.findByTitulo(tour.getTitulo()).isPresent())
            throw new BadRequestException("ACCIÓN NO REALIZADA: Ya existe un tour con los datos ingresados");
        return toDTO(tourRepository.save(tour));
    }

    @Override
    public Optional<TourDTO> buscarPorId(Long id) throws BadRequestException {
        Optional<Tour> encontrado = tourRepository.findById(id);
        return encontrado.map(tour -> toDTO(tour));
    }

    @Override
    public Collection<Tour> listarTodos(){
        List<Tour> tours = tourRepository.findAll();
        return tours;
    }

    private TourDTO toDTO(Tour d){
        return mapper.convertValue(d, TourDTO.class);
    }

    private Tour toModel(TourDTO d){
        return mapper.convertValue(d, Tour.class);
    }
}
