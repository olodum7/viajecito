package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.awt.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ALOJAMIENTO")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Alojamiento {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "alojamiento_seq")
    @SequenceGenerator(name = "alojamiento_seq", sequenceName = "alojamiento_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @ManyToMany
    @JoinTable( name = "ALOJAMIENTO_DIRECCION",
            joinColumns = @JoinColumn(name = "ALOJAMIENTO_ID"),
            inverseJoinColumns = @JoinColumn(name = "DIRECCION_ID"))
    private Set<Direccion> direcciones = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY)
    private Set<Imagen> imagenes = new HashSet<>();

    @ManyToMany(mappedBy = "alojamientos")
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}