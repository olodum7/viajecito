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
@Table(name = "IMAGEN")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Imagen {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "imagen_seq")
    @SequenceGenerator(name = "imagen_seq", sequenceName = "imagen_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "CONTENIDO")
    @Lob
    private byte[] contenido;

    @ManyToMany(mappedBy = "imagenes")
    @JsonIgnore
    private Set<Alojamiento> alojamiento = new HashSet<>();

    @ManyToMany(mappedBy = "imagenes")
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}
