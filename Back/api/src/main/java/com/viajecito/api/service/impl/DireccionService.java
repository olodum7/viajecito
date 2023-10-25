package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.DireccionDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.repository.IDireccionRepository;
import com.viajecito.api.service.IDireccionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DireccionService implements IDireccionService {
    @Autowired
    private IDireccionRepository direccionRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public DireccionDTO agregar(DireccionDTO direccionDTO) throws BadRequestException {
        if (direccionRepository
                .findByDomicilioAndLocalidadAndProvincia(direccionDTO.getDomicilio(), direccionDTO.getLocalidad(),
                        direccionDTO.getProvincia()).isPresent())
            throw new BadRequestException("ACCIÓN NO REALIZADA: Ya existe una direccion con los datos ingresados");
        return toDTO(direccionRepository.save(toModel(direccionDTO)));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        if (!buscarPorId(id).isPresent()) {
            throw new BadRequestException("ACCIÓN NO REALIZADA: No existe la dirección a borrar");
        }
        direccionRepository.deleteById(id);
    }

    @Override
    public DireccionDTO modificar(Direccion domicilio) throws BadRequestException {
        if (direccionRepository.findById(domicilio.getId()).isEmpty())
            throw new BadRequestException("ACCIÓN NO REALIZADA: No existe la dirección a modificar");
        return toDTO(direccionRepository.save(domicilio));
    }

    @Override
    public Optional<DireccionDTO> buscarPorId(Long id) {
        Optional<Direccion> encontrado = direccionRepository.findById(id);
        return encontrado.map(direccion -> toDTO(direccion));
    }

    @Override
    public Collection<DireccionDTO> listarTodos() throws BadRequestException {
        List<Direccion> direcciones = direccionRepository.findAll();
        Set<DireccionDTO> direccionesDTOS = new HashSet<DireccionDTO>();
        for(Direccion direccion: direcciones)
            direccionesDTOS.add(toDTO(direccion));

        if (direccionesDTOS.size() == 0)
            throw new BadRequestException("INFORMACIÓN: La lista de direcciones se encuentra vacía");
        return direccionesDTOS;
    }

    @Override
    public Set<Direccion> agregarTodas(Set<Direccion> direcciones){
        Set<Direccion> dirrecionesAgregadas = new HashSet<Direccion>();
        for (Direccion direccion : direcciones) {
            Optional<Direccion> existente = direccionRepository.findByDomicilioAndLocalidadAndProvincia(direccion.getDomicilio(), direccion.getLocalidad(), direccion.getProvincia());
            if (existente.isPresent()) {
                dirrecionesAgregadas.add(direccionRepository.findById(existente.get().getId()).orElse(null));
            } else {
                dirrecionesAgregadas.add(direccionRepository.save(direccion));
            }
        }
        return dirrecionesAgregadas;
    }

    private DireccionDTO toDTO(Direccion d){
        return mapper.convertValue(d, DireccionDTO.class);
    }

    private Direccion toModel(DireccionDTO d){
        return mapper.convertValue(d, Direccion.class);
    }

}
