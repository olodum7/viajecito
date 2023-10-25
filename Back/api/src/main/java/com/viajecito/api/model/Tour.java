package com.viajecito.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "TOUR")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tour {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "tour_seq")
    @SequenceGenerator(name = "tour_seq", sequenceName = "tour_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @Column(name = "PRECIO")
    private Double precio;

    /*@Column(name = "TRANSPORTE")
    private String transporte;*/

    @Column(name = "CATEGORIA")
    @Enumerated(EnumType.STRING)
    private TourCategoria categoria;

   /* @ManyToMany
    @JoinTable( name = "TOUR_AlOJAMIENTO",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "ALOJAMIENTO_ID"))
    private Set<Alojamiento> alojamientos = new HashSet<>();

    @ManyToMany
    @JoinTable( name = "TOUR_ACTIVIDAD",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "ACTIVIDAD_ID"))
    private Set<Actividad> actividades = new HashSet<>();*/

    @ManyToMany
    @JoinTable(name = "TOUR_IMAGEN",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "IMAGEN_ID"))
    private Set<Imagen> imagenes = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.MERGE)
    private Set<Reserva> reservas = new HashSet<>();
}
