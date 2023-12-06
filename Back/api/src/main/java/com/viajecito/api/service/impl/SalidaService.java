package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.controller.ExceptionController;
import com.viajecito.api.dto.SalidaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.exception.BadRuntimeException;
import com.viajecito.api.model.Salida;
import com.viajecito.api.model.Tour;
import com.viajecito.api.repository.ISalidaRepository;
import com.viajecito.api.service.ISalidaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.text.DateFormatSymbols;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SalidaService implements ISalidaService {
    @Autowired
    private ISalidaRepository salidaRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public SalidaDTO agregar(Salida salida) throws BadRequestException {
        return toDTO(salidaRepository.save(salida));
    }

    @Override
    public SalidaDTO modificar(Salida salida) {
        return toDTO(salidaRepository.save(salida));
    }

    @Override
    public SalidaDTO buscarPorId(Long id) throws BadRequestException {
        Salida encontrada = salidaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("No se ha encontrado una Salida con ID: " + id));
        return toDTO(encontrada);
    }

    @Override
    public SalidaDTO buscarActivoPorTour(Tour tour) throws BadRequestException {
        Salida resultado = new Salida();
        resultado = salidaRepository.findByTour(tour)
                .orElseThrow(() -> new BadRequestException("No se ha encontrado una Salida para el Tour: " + tour.getTitulo()));;
        return toDTO(resultado);
    }

    private SalidaDTO toDTO(Salida s){
        SalidaDTO dto = new SalidaDTO();
        Set<Long> toursId = new HashSet<>();
        String periodo = daysToStringPeriod(s.getDias(), s.getFechaDesde(), s.getFechaHasta());
        dto.setFechaSalidaDesde(s.getFechaDesde());
        dto.setFechaSalidaHasta(s.getFechaHasta());
        dto.setDias(s.getDias());
        dto.setPeriodo(periodo);

        return dto;
    }

    private String daysToStringPeriod(String days, LocalDate desde, LocalDate hasta){
        String period = "";
        int mesDesde = desde.getMonthValue();
        int mesHasta = hasta.getMonthValue();

        DateFormatSymbols symbols = new DateFormatSymbols(new Locale("es", "ES"));
        String nombreMesDesde = Character.toUpperCase(symbols.getShortMonths()[mesDesde - 1].charAt(0)) + symbols.getShortMonths()[mesDesde - 1].substring(1);
        String nombreMesHasta = Character.toUpperCase(symbols.getShortMonths()[mesHasta - 1].charAt(0)) + symbols.getShortMonths()[mesHasta - 1].substring(1);

        // Separo la cadena en un array de valores
        String[] valuesArray = days.split(",");
        // Defino los días de la semana
        String[] daysOfWeek = {"Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"};

        // Creo un mapa para representar los días con valores booleanos
        Map<String, Boolean> daysMap = new HashMap<>();

        // Itero sobre los valores y asigno a los días correspondientes
        for (int i = 0; i < valuesArray.length && i < daysOfWeek.length; i++) {
            String day = daysOfWeek[i];
            boolean value = "1".equals(valuesArray[i]);
            daysMap.put(day, value);
        }

        Map<String, Boolean> filteredDaysMap = daysMap.entrySet()
                .stream()
                .filter(Map.Entry::getValue)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        List<String> sortedDays = new ArrayList<>(filteredDaysMap.keySet());
        Collections.sort(sortedDays); // Ordena los días de la semana

        if (filteredDaysMap.size() == 7) {
            period = nombreMesDesde.equals(nombreMesHasta)
                    ? nombreMesDesde
                    : nombreMesDesde + "-" + nombreMesHasta + " " + hasta.getYear();
        } else if (filteredDaysMap.size() == 2) {
            period = String.join(" y ", sortedDays);
        } else if (filteredDaysMap.size() == 1) {
            period = String.join(",", sortedDays);
        }else{
            period = String.join(",", sortedDays);
            int lastCommaIndex = period.lastIndexOf(",");
            period = period.substring(0, lastCommaIndex) + " y " + period.substring(lastCommaIndex + 1);
        }
        return period;
    }

    @Override
    public List<SalidaDTO> obtenerTodas() {
        List<Salida> salidas = salidaRepository.findAll();
        return salidas.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public SalidaDTO actualizar(Long id, Salida datosSalida) throws BadRequestException {
        Salida salidaExistente = salidaRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("No se ha encontrado una Salida con ID: " + id));

        salidaExistente.setFechaDesde(datosSalida.getFechaDesde());

        Salida salidaActualizada = salidaRepository.save(salidaExistente);
        return toDTO(salidaActualizada);
    }

    @Override
    public boolean eliminar(Long id) {
        if (salidaRepository.existsById(id)) {
            salidaRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
