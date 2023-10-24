package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ACTIVIDAD")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Actividad {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "actividad_seq")
    @SequenceGenerator(name = "actividad_seq", sequenceName = "actividad_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "FECHA_HORA")
    private LocalDateTime fechaHora;

    @Column(name = "PRECIO")
    private Double precio;

    @Enumerated(EnumType.STRING)
    private ActividadEstado estado;

    @ManyToMany
    @JoinTable( name = "ACTIVIDAD_DIRECCION",
            joinColumns = @JoinColumn(name = "ACTIVIDAD_ID"),
            inverseJoinColumns = @JoinColumn(name = "DIRECCION_ID"))
    private Set<Direccion> direcciones = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Imagen> imagenes = new HashSet<>();

    @ManyToMany(mappedBy = "actividades")
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}
