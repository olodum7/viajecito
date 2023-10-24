package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "DIRECCION")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Direccion {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "direccion_seq")
    @SequenceGenerator(name = "direccion_seq", sequenceName = "direccion_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "DOMICILIO")
    private String domicilio;

    @Column(name = "LOCALIDAD")
    private String localidad;

    @Column(name = "PROVINCIA")
    private String provincia;

    @ManyToMany(mappedBy = "direcciones")
    @JsonIgnore
    private Set<Alojamiento> alojamientos = new HashSet<>();

    @ManyToMany(mappedBy = "direcciones")
    @JsonIgnore
    private Set<Actividad> actividades = new HashSet<>();
}
