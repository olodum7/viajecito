package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.catalina.User;

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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "CATEGORIA_ID", referencedColumnName = "ID", updatable = false, nullable = false)
    private TourCategoria categoria;

    @Column(name = "DURACION")
    private String duracion;

    @Column(name = "DIFICULTAD")
    @Enumerated(EnumType.STRING)
    private TourDificultad dificultad;


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

    @ManyToMany
    @JoinTable(name = "TOUR_FAVORITOS",
            joinColumns = @JoinColumn(name = "TOUR_ID"),
            inverseJoinColumns = @JoinColumn(name = "USER_ID"))
    private Set<AppUser> usuarios = new HashSet<>();

    @OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.MERGE)
    private Set<Reserva> reservas = new HashSet<>();
}
