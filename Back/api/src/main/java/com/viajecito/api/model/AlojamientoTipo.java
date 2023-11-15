package com.viajecito.api.model;

public enum AlojamientoTipo {
    HOTEL("Hotel"),
    APARTAMENTO("Apartamento"),
    CASA("Casa"),
    DEPARTAMENTO("Departamento"),
    HOSTEL("Hotel"),
    CABAÑA("Cabaña");

    private final String descripcion;
    AlojamientoTipo(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion(){
        return descripcion;
    }
}
