package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.Tour;
import com.viajecito.api.model.Usuario;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class ReservaDTO implements Serializable {
    private LocalDateTime fechaHoraSalida;
    private Integer cantDias;
    private Integer acompaniantes;
    private Usuario usuario;
    private Tour tour;
}
