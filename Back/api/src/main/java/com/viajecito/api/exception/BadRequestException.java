package com.viajecito.api.exception;

import com.viajecito.api.model.MensajeRespuesta;

public class BadRequestException extends Exception{
    private MensajeRespuesta mensajeRespuesta;
    public BadRequestException(String mensaje){
        super(mensaje);
        this.mensajeRespuesta = new MensajeRespuesta("error", mensaje);
    }
}
