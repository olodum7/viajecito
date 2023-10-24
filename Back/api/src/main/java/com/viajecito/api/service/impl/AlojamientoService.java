package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.AlojamientoDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.repository.IAlojamientoRepository;
import com.viajecito.api.service.IAlojamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AlojamientoService implements IAlojamientoService {
    @Autowired
    private IAlojamientoRepository alojamientoRepository;

    @Autowired
    private DireccionService direccionService;

    @Autowired
    ObjectMapper mapper;

    @Transactional
    @Override
    public AlojamientoDTO agregar(AlojamientoDTO alojamientoDTO) throws BadRequestException {
        // Agregando las direcciones primero (solo en caso de que no existan)
        Set<Direccion> dirreciones = direccionService.agregarTodas(alojamientoDTO.getDirecciones());
        alojamientoDTO.setDirecciones(dirreciones);

        Optional<Alojamiento> encotrado = alojamientoRepository.findByNombreAndDireccionesIn(alojamientoDTO.getNombre(), alojamientoDTO.getDirecciones());
        if(encotrado.isPresent())
            throw new BadRequestException("ACCIÓN NO REALIZADA: Ya existe un alojamiento con los datos ingresados");
        return toDTO(alojamientoRepository.save(toModel(alojamientoDTO)));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        if(buscarPorId(id).isPresent())
            alojamientoRepository.deleteById(id);
    }

    @Transactional
    @Override
    public AlojamientoDTO modificar(Alojamiento alojamiento) throws BadRequestException {
        // Modificando las direcciones
        Set<Direccion> dirreciones = direccionService.agregarTodas(alojamiento.getDirecciones());
        alojamiento.setDirecciones(dirreciones);

        if(alojamientoRepository.findById(alojamiento.getId() ) == null)
            throw new BadRequestException("ACCIÓN NO REALIZADA: No existe el alojamiento a modificar");
        return toDTO(alojamientoRepository.save(alojamiento));
    }

    @Override
    public Optional<AlojamientoDTO> buscarPorId(Long id) throws BadRequestException {
        Optional<Alojamiento> encontrado = alojamientoRepository.findById(id);
        return encontrado.map(alojamiento -> toDTO(alojamiento));
    }

    @Override
    public Collection<AlojamientoDTO> listarTodos() throws BadRequestException {
        List<Alojamiento> alojamientos = alojamientoRepository.findAll();
        Set<AlojamientoDTO> alojamientosDTOS = new HashSet<AlojamientoDTO>();
        for (Alojamiento alojamiento: alojamientos)
            alojamientosDTOS.add(toDTO(alojamiento));

        if(alojamientosDTOS.size() == 0)
            throw new BadRequestException("INFORMACIÓN: La lista de alojamientos se encuentra vacía");
        return alojamientosDTOS;
    }

    public Set<Alojamiento> agregarTodos(Set<Alojamiento> alojamientos){
        Set<Alojamiento> alojamientosAgregados = new HashSet<Alojamiento>();
        for(Alojamiento alojamiento : alojamientos){
            // Agrego domicilios primero
            Set<Direccion> direcciones = direccionService.agregarTodas(alojamiento.getDirecciones());
            alojamiento.setDirecciones(direcciones);

            Optional<Alojamiento> existe = alojamientoRepository.findByNombreAndDireccionesIn(alojamiento.getNombre(), alojamiento.getDirecciones());
            if(existe.isPresent()){
                alojamientosAgregados.add(alojamientoRepository.findById(existe.get().getId()).orElse(null));
            }else {
                alojamientosAgregados.add(alojamientoRepository.save(alojamiento));
            }
        }
        return alojamientosAgregados;
    }

    private AlojamientoDTO toDTO(Alojamiento d){
        return mapper.convertValue(d, AlojamientoDTO.class);
    }

    private Alojamiento toModel(AlojamientoDTO d){
        return mapper.convertValue(d, Alojamiento.class);
    }
}
