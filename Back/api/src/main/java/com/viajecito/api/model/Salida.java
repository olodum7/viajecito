package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "SALIDA")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Salida {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "salida_seq")
    @SequenceGenerator(name = "salida_seq", sequenceName = "salida_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FECHA_DESDE")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaDesde;

    @Column(name = "FECHA_HASTA")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaHasta;

    @Column(name = "DIAS")
    private String dias;

    @Column(name = "ACTIVO")
    private Boolean activo;

    @ManyToMany(mappedBy = "salidas")
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}
