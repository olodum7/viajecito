package com.viajecito.api.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FechaDisponible {
    private String fecha;
    private boolean disponible;
}
