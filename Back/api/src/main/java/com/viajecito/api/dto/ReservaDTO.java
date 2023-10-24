package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.AppUser;
import com.viajecito.api.model.Tour;
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
    private AppUser usuario;
    private Tour tour;
}
