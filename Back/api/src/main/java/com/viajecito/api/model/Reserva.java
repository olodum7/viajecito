package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
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

    @Column(name = "FECHA_HORA_SALIDA")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaHoraSalida;

    @Column(name = "CANT_DIAS")
    private Integer cantDias;

    @Column(name = "ACOMPANIANTES")
    private Integer acompaniantes;

    @ManyToOne
    @JoinColumn(name = "USUARIO_ID")
    private Usuario usuario;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.MERGE)
    @JsonIgnore
    private Set<Tour> tour = new HashSet<>();
}
