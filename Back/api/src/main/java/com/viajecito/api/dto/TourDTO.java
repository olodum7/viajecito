package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.Actividad;
import com.viajecito.api.model.Alojamiento;
import com.viajecito.api.model.TourCategoria;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class TourDTO implements Serializable {
    private String nombre;
    private String descripcion;
    private Double precio;
    private String transporte;
    private TourCategoria categoria;
    private List<Alojamiento> alojamientos;
    private List<Actividad> actividades;
}
