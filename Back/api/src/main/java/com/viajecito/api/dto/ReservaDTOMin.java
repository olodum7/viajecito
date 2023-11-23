package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.Tour;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class ReservaDTOMin implements Serializable {
    private LocalDate fechaSalida;
    private Integer acompaniantes_mayores;
    private Integer acompaniantes_menores;
    private String usuario;
}
