package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.CategoriaDTO;
import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Categoria;
import com.viajecito.api.model.Tour;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.repository.ITourRepository;
import com.viajecito.api.service.ICategoriaService;
import com.viajecito.api.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class TourService implements ITourService {
    @Autowired
    private ITourRepository tourRepository;

    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    ObjectMapper mapper;

    @Transactional
    @Override
    public TourDTO agregar(TourDTO tourDTO) throws BadRequestException {
        /************* VALIDACION DE CAMPOS *************/
        /**** Controlo ingreso repetido ****/
        if (tourRepository.findByTitulo(tourDTO.getTitulo()).isPresent())
            throw new BadRequestException("Ya existe un tour con los datos ingresados.");
        return toDTO(tourRepository.save(toModel(tourDTO)));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        /**** Controlo que exista ****/
        if(!buscarPorId(id).isPresent())
            throw new BadRequestException("El tour a eliminar no existe.");
        tourRepository.deleteById(id);
    }

    @Override
    public TourDTO modificar(Tour tour) throws BadRequestException {
        /**** Controlo que el titulo no se repita ****/
        if (tourRepository.findByTitulo(tour.getTitulo()).isPresent())
            throw new BadRequestException("Ya existe un tour con el titulo ingresado.");
        return toDTO(tourRepository.save(tour));
    }

    @Override
    public Optional<TourDTO> buscarPorId(Long id){
        Optional<Tour> encontrado = tourRepository.findById(id);
        return encontrado.map(tour -> toDTO(tour));
    }

    @Override
    public Collection<Tour> listarTodos(){
        return tourRepository.findAll();
    }

    private TourDTO toDTO(Tour d){
        return mapper.convertValue(d, TourDTO.class);
    }

    private Tour toModel(TourDTO d){
        return mapper.convertValue(d, Tour.class);
    }
}
