package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class TourDTO implements Serializable {
    private Long id;
    private String titulo;
    private String subtitulo;
    private Double precio;
    private String categoria;
    private String rating;
    private String duracion;
    private String dificultad;
    private SalidaDTO salidaDTO;
    private Boolean pasajes;
    private String transporte;
    private Boolean traslado;
    private String entradas;
    private Boolean guia_es;
    private String itinerario;
    private Long alojamiento;
    private Set<Long> imagenes;
    private Long usuariosFav;
}
