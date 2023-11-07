package com.viajecito.api.model;

public enum TourDificultad {
    ALTA("Alta"),
    MEDIA_ALTA("Media-Alta"),
    MEDIA("Media"),
    MEDIA_BAJA("Media-Baja"),
    BAJA("Baja");

    private final String descripcion;
    TourDificultad(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getDescripcion() {
        return descripcion;
    }
}
