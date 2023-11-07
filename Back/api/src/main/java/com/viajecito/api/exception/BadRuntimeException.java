package com.viajecito.api.exception;

public class BadRuntimeException extends RuntimeException{
    public BadRuntimeException(String partName) {
        super("El parámetro '" + partName + "' es obligatorio");
    }
}
