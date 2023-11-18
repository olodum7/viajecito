// This class represents the entity/model for available dates
// Place this code in 'FechaDisponible.java' file

package com.viajecito.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FechaDisponible {
    @Id
    private Long id;
    private LocalDate fecha;
    private boolean disponible;
}
