package com.viajecito.api.service;

import com.viajecito.api.dto.FechaDisponibleDTO;

import java.util.List;

public interface  IFechaDisponibleService {
    List<FechaDisponibleDTO> obtenerFechasDisponibles();
}