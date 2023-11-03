package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.ActividadEstado;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class ActividadDTO implements Serializable {
    private String nombre;
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaHora;
    private ActividadEstado estado;
}
