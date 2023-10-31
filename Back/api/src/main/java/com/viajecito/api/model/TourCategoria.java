package com.viajecito.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "CATEGORIA")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TourCategoria {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "categoria_seq")
    @SequenceGenerator(name = "categoria_seq", sequenceName = "categoria_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "DESCRIPCION")
    private String descripcion;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "TOUR_ID", referencedColumnName = "ID", updatable = false, nullable = false)
    private Tour tour;
}
