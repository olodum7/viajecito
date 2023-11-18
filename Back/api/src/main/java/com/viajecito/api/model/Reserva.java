package com.viajecito.api.model;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "RESERVA")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reserva_seq")
    @SequenceGenerator(name = "reserva_seq", sequenceName = "reserva_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "FECHA_HORA_SALIDA")
    private LocalDateTime fechaHoraSalida;

    @Column(name = "CANT_DIAS")
    private Integer cantDias;

    @Column(name = "ACOMPANIANTES")
    private Integer acompaniantes;

    @ManyToOne
    @JoinColumn(name = "USUARIO_ID")
    private Usuario usuario;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @ToString.Exclude
    private Set<Tour> tour = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "TIPO_ALOJAMIENTO")
    private AlojamientoTipo tipoAlojamiento;

    public AlojamientoTipo getTipoAlojamiento() {
        return tipoAlojamiento;
    }
}
