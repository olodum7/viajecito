package com.viajecito.api.controller;

import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.exception.BadRuntimeException;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.util.Map;

@ControllerAdvice
public class ExceptionController {
    private static final Logger log = Logger.getLogger(ExceptionController.class);

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleServerException(RuntimeException exception) {
        log.error(exception.getClass().getSimpleName() + ": " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(Exception exception) {
        log.error(exception.getClass().getSimpleName() + ": " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<?> handleMissingRequestPart(MissingServletRequestPartException ex) {
        BadRuntimeException exception = new BadRuntimeException(ex.getRequestPartName());
        log.error(exception.getClass().getSimpleName()+" FALTAN DATOS: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("tipo", "error", "mensaje", exception.getMessage()));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<?> handleMissingRequestParameter(MissingServletRequestParameterException ex) {
        BadRuntimeException exception = new BadRuntimeException(ex.getParameterName());
        log.error(exception.getClass().getSimpleName()+" FALTAN PARAMETROS: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("tipo", "error", "mensaje", exception.getMessage()));
    }
}
