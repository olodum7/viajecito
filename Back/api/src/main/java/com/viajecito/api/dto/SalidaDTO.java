package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.viajecito.api.model.Tour;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class SalidaDTO implements Serializable {
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaSalidaDesde;
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private LocalDate fechaSalidaHasta;
    private String dias;
    private String periodo;
}
