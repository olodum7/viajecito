package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.Direccion;
import com.viajecito.api.model.Imagen;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class AlojamientoDTO implements Serializable {
    private String nombre;
    private Set<Direccion> direcciones;
    private List<Imagen> imagenes;
}