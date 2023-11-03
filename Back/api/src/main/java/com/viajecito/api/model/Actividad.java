package com.viajecito.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "ACTIVIDAD")
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class Actividad {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE,  generator = "actividad_seq")
    @SequenceGenerator(name = "actividad_seq", sequenceName = "actividad_seq", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOMBRE")
    private String nombre;

    @Column(name = "FECHA_HORA")
    @DateTimeFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaHora;

    @Enumerated(EnumType.STRING)
    private ActividadEstado estado;

    @ManyToMany(mappedBy = "actividades")
    @JsonIgnore
    private Set<Tour> tours = new HashSet<>();
}
