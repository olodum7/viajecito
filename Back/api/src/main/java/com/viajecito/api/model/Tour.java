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

    @Column(name = "TITULO")
    private String titulo;

    @Column(name = "SUB_TITULO")
    private String subtitulo;

    @Column(name = "PRECIO")
    private Double precio;

    @ManyToOne
    @JoinColumn(name = "CATEGORIA_ID")
    private Categoria categoria;

    @Column(name = "RATING")
    private String rating;

    @Column(name = "DURACION")
    private String duracion;

    @Column(name = "DIFICULTAD")
    @Enumerated(EnumType.STRING)
    private TourDificultad dificultad;

    @Column(name = "SALIDAS")
    private String salidas;

    @Column(name = "PASAJES")
    private Boolean pasajes;

    @Column(name = "TRANSPORTE")
    private String transporte;

    @Column(name = "TRASLADO")
    private Boolean traslado;

    @Column(name = "ENTRADAS")
    private String entradas;

    @Column(name = "GUIA_ES")
    private Boolean guia_es;

    @Column(name = "ITINERARIO", columnDefinition = "TEXT")
    private String itinerario;

    @ManyToOne
    @JoinColumn(name = "ALOJAMIENTO_ID")
    private Alojamiento alojamiento;

    @ManyToMany
    @JoinTable(name = "TOUR_IMAGEN",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "IMAGEN_ID"))
    private Set<Imagen> imagenes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "TOUR_FAVORITOS",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID"))
    private Set<Usuario> usuarios = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.MERGE)
    private Set<Reserva> reservas = new HashSet<>();
}
