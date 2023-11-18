package com.viajecito.api.service.impl;

import com.viajecito.api.dto.FechaDisponibleDTO;
import com.viajecito.api.model.FechaDisponible;
import com.viajecito.api.repository.FechaDisponibleRepository;
import com.viajecito.api.service.impl.FechaDisponibleService;
import com.viajecito.api.service.IFechaDisponibleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FechaDisponibleService implements IFechaDisponibleService {

    private final FechaDisponibleRepository fechaDisponibleRepository;
    private final ModelMapper modelMapper; // Use ModelMapper to convert entities to DTOs

    @Autowired
    public FechaDisponibleService (FechaDisponibleRepository fechaDisponibleRepository, ModelMapper modelMapper) {
        this.fechaDisponibleRepository = fechaDisponibleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<FechaDisponibleDTO> obtenerFechasDisponibles() {
        List<FechaDisponible> fechasDisponibles = fechaDisponibleRepository.findAll();
        return fechasDisponibles.stream()
                .map(fecha -> modelMapper.map(fecha, FechaDisponibleDTO.class))
                .collect(Collectors.toList());
    }
}