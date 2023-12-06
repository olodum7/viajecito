package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ReservaDTO;
import com.viajecito.api.dto.ReservaDTOMin;
import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Imagen;
import com.viajecito.api.model.Salida;
import com.viajecito.api.model.Tour;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.repository.ISalidaRepository;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.service.IReservaService;
import com.viajecito.api.service.ISalidaService;
import com.viajecito.api.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class TourService implements ITourService {
    @Autowired
    private ITourRepository tourRepository;

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    private ISalidaService salidaService;

    @Autowired
    private ISalidaRepository salidaRepository;

    @Autowired
    private IReservaService reservaService;

    @Autowired
    private ObjectMapper mapper;

    @Transactional
    @Override
    public TourDTO agregar(Tour tour) throws BadRequestException {
        /************* VALIDACION DE CAMPOS *************/
        /**** Controlo ingreso repetido ****/
        if (tourRepository.findByTitulo(tour.getTitulo()).isPresent())
            throw new BadRequestException("Ya existe un tour con los datos ingresados.");

        Tour nuevo = tourRepository.save(tour);

        /** Si la salida no existe la agrego **/
        Salida nuevaSalida = new Salida();
        Set<Salida> salidas = new HashSet<>();
        for (Salida s : tour.getSalidas()){
            s.setTour(nuevo);
            nuevaSalida = salidaRepository.save(s);
            salidas.add(nuevaSalida);
        }

        nuevo.setSalidas(salidas);
        return toDTO(nuevo);
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        /**** Controlo que exista ****/
        if(buscarPorId(id) == null)
            throw new BadRequestException("El tour a eliminar no existe.");
        tourRepository.deleteById(id);
    }

    @Override
    public TourDTO modificar(Tour tour) throws BadRequestException {
        return toDTO(tourRepository.save(tour));
    }

    @Override
    public TourDTO buscarPorId(Long id) throws BadRequestException {
        Tour encontrado = tourRepository.findById(id)
                .orElseThrow(() -> new
                        BadRequestException("No se ha encontrado un Tour con ID: " + id));
        return toDTO(encontrado);
    }

    @Override
    public Collection<TourDTO> listarTodos() throws BadRequestException {
        Collection<TourDTO> collection = new ArrayList<>();
        for (Tour tour : tourRepository.findAll())
            collection.add(toDTO(tour));
        return collection;
    }

    @Override
    public Collection<TourDTO> listarDisponibles(LocalDate fechaSalida) throws BadRequestException {
        Collection<TourDTO> allTours = this.listarTodos();
        Collection<TourDTO> toursDisponibles = new ArrayList<>();
        Boolean libre = true;

        for (TourDTO dto : allTours){
            Collection<ReservaDTOMin> reservaDTOS = reservaService.listarTodasPorTour(toModel(dto));

            for (ReservaDTOMin reservaDTO : reservaDTOS){
                if (fechaSalida == reservaDTO.getFechaSalida());
                libre = false;
                break;
            }

            if (libre == true){
                toursDisponibles.add(dto);
            }
        }

        return toursDisponibles;
    }

    private TourDTO toDTO(Tour d) throws BadRequestException {
        TourDTO dto = new TourDTO();
        Set<Long> imagenesId = new HashSet<>();
        SalidaDTO salidaDTO = new SalidaDTO();

        dto.setId(d.getId());
        dto.setTitulo(d.getTitulo());
        dto.setSubtitulo(d.getSubtitulo());
        dto.setPrecioBase(d.getPrecioBase());
        dto.setPrecioAdulto(d.getPrecioAdulto());
        dto.setPrecioMenor(d.getPrecioMenor());
        dto.setCategoria(d.getCategoria().getNombre());
        dto.setRating(d.getRating());
        dto.setDuracion(d.getDuracion());
        dto.setDificultad(d.getDificultad().getDescripcion());

        salidaDTO = salidaService.buscarActivoPorTour(d);
        dto.setSalidaDTO(salidaDTO);

        dto.setTransporte(d.getTransporte());
        dto.setTraslado(d.getTraslado());
        dto.setEntradas(d.getEntradas());
        dto.setGuia(d.getGuia());
        dto.setItinerario(d.getItinerario());
        dto.setAlojamiento(d.getAlojamiento().getId());

        for (Imagen imagen : d.getImagenes())
            imagenesId.add(imagen.getId());
        dto.setImagenes(imagenesId);

        dto.setUsuariosFav(d.getUsuarios().stream().count());

        return dto;
    }

    private Tour toModel(TourDTO d){
        return mapper.convertValue(d, Tour.class);
    }
}