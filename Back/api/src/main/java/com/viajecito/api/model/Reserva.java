package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "RESERVA")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Reserva {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "reserva_seq")
    @SequenceGenerator(name = "reserva_seq", sequenceName = "reserva_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FECHA_SALIDA")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaSalida;

    @Column(name = "ACOMPANIANTES_MAYORES")
    private Integer acompaniantes_mayores;

    @Column(name = "ACOMPANIANTES_MENORES")
    private Integer acompaniantes_menores;

    @ManyToOne
    @JoinColumn(name = "USUARIO_ID")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "TOUR_ID")
    private Tour tour = new Tour();
}
