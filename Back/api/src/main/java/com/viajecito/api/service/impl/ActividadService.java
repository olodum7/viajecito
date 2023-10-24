package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.ActividadDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.repository.IActividadRepository;
import com.viajecito.api.service.IActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class ActividadService implements IActividadService {
    @Autowired
    private IActividadRepository actividadRepository;

    @Autowired
    private DireccionService direccionService;

    @Autowired
    ObjectMapper mapper;

    @Transactional
    @Override
    public ActividadDTO agregar(ActividadDTO actividadDTO) throws BadRequestException {
        // Agregando las direcciones primero (solo en caso de que no existan)
        Set<Direccion> dirreciones = direccionService.agregarTodas(actividadDTO.getDirecciones());
        actividadDTO.setDirecciones(dirreciones);

        // Eliminando milisegundos para comparar fecha
        LocalDateTime dateTimeIngresado = actividadDTO.getFechaHora();
        LocalDateTime dateTimeModificado = dateTimeIngresado.truncatedTo(ChronoUnit.SECONDS);

        if (actividadRepository.findByNombreAndFechaHora(actividadDTO.getNombre(), dateTimeModificado).isPresent())
            throw new BadRequestException("ACCIÓN NO REALIZADA: Ya existe una actividad con los datos ingresados");
        return toDTO(actividadRepository.save(toModel(actividadDTO)));
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        if (buscarPorId(id).isPresent())
            actividadRepository.deleteById(id);
    }

    @Transactional
    @Override
    public ActividadDTO modificar(Actividad actividad) throws BadRequestException {
        // Modificando las direcciones
        Set<Direccion> dirreciones = direccionService.agregarTodas(actividad.getDirecciones());
        actividad.setDirecciones(dirreciones);

        if (actividadRepository.findById(actividad.getId() ) == null)
            throw new BadRequestException("ACCIÓN NO REALIZADA: No existe la actividad a modificar");
        return toDTO(actividadRepository.save(actividad));
    }

    @Override
    public Optional<ActividadDTO> buscarPorId(Long id) throws BadRequestException {
        Optional<Actividad> encontrada = actividadRepository.findById(id);
        return encontrada.map(actividad -> toDTO(actividad));
    }

    @Override
    public Collection<ActividadDTO> listarTodos() throws BadRequestException {
        List<Actividad> actividades = actividadRepository.findAll();
        Set<ActividadDTO> actividadesDTOS = new HashSet<ActividadDTO>();
        for (Actividad actividad: actividades)
            actividadesDTOS.add(toDTO(actividad));

        if(actividadesDTOS.size() == 0)
            throw new BadRequestException("INFORMACIÓN: La lista de actividades se encuentra vacía");
        return actividadesDTOS;
    }

    public Set<Actividad> agregarTodos(Set<Actividad> actividades){
        Set<Actividad> actividadesAgragadas = new HashSet<Actividad>();
        for (Actividad actividad : actividades){
            // Agrego domicilios primero
            Set<Direccion> direcciones = direccionService.agregarTodas(actividad.getDirecciones());
            actividad.setDirecciones(direcciones);

            Optional<Actividad> existe = actividadRepository.findByNombreAndFechaHora(actividad.getNombre(), actividad.getFechaHora());
            if(existe.isPresent()){
                actividadesAgragadas.add(actividadRepository.findById(existe.get().getId()).orElse(null));
            }else{
                actividadesAgragadas.add(actividadRepository.save(actividad));
            }
        }
        return actividadesAgragadas;
    }
    private ActividadDTO toDTO(Actividad d){
        return mapper.convertValue(d, ActividadDTO.class);
    }

    private Actividad toModel(ActividadDTO d){
        return mapper.convertValue(d, Actividad.class);
    }
}
