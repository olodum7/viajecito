package com.viajecito.api.service;

import com.viajecito.api.dto.UsuarioDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Usuario;

import java.util.Collection;

public interface IUsuarioService {
    UsuarioDTO agregar(Usuario usuario) throws BadRequestException;
    void eliminar(Long id) throws BadRequestException;
    UsuarioDTO modificar(Usuario usuario) throws BadRequestException;
    UsuarioDTO buscarPorId(Long id) throws BadRequestException;
    Collection<UsuarioDTO> listarTodos();
}
