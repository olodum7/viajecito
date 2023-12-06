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

    // Obtener el TourDificultad por descripción
    public static TourDificultad fromDescripcion(String descripcion) {
        for (TourDificultad dificultad : TourDificultad.values()) {
            if (dificultad.descripcion.equals(descripcion)) {
                return dificultad;
            }
        }
        // Manejar el caso en que la descripción no coincida con ninguna enum
        throw new IllegalArgumentException("No hay TourDificultad con la descripción: " + descripcion);
    }
}
