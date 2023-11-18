package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.AlojamientoTipo;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class AlojamientoDTO implements Serializable {
    private String nombre;
    private String tipo;
    private String ubicacion;
    private Set<Long> imagenes;
}
