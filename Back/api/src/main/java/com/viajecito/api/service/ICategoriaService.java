package com.viajecito.api.service;

import com.viajecito.api.dto.CategoriaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Categoria;

import java.util.Collection;
import java.util.Optional;

public interface ICategoriaService {
    CategoriaDTO agregar(CategoriaDTO categoriaDTO) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    CategoriaDTO modificar(Categoria categoria) throws BadRequestException;
    Optional<CategoriaDTO> buscarPorId(Long id);
    Collection<Categoria> listarTodas();
}
