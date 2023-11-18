package com.viajecito.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FechaDisponibleDTO {
    private LocalDate fecha;
    private boolean disponible;
}
