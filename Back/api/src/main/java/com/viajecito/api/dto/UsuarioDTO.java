package com.viajecito.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter @Setter
public class UsuarioDTO implements Serializable {
    private String nickname;
    private String nombreCompleto;
    private String email;
}
