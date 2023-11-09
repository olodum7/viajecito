package com.viajecito.api.exception;

import com.viajecito.api.model.MensajeRespuesta;

public class BadRuntimeException extends RuntimeException{
    private MensajeRespuesta mensajeRespuesta;
    public BadRuntimeException(String partName) {
        super("El parámetro '" + partName + "' es obligatorio");
        this.mensajeRespuesta = new MensajeRespuesta("error", "El parámetro '" + partName + "' es obligatorio");
    }
}
