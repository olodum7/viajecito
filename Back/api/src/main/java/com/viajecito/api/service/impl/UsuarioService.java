package com.viajecito.api.service.impl;

import com.viajecito.api.dto.UsuarioDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements UserDetailsService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    public UsuarioDTO registrar(Usuario usuario) throws BadRequestException {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent())
            throw new BadRequestException("Ya existe un usuario con el email ingresado");
        return toDTO(usuarioRepository.save(usuario));
    }

    public UsuarioDTO modificar(Usuario usuario) {
        return null;
    }

    public List<Usuario> listarTodos(){
        return usuarioRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado."));

        return new org.springframework.security.core.userdetails.User(
                usuario.getUsername(),
                usuario.getPassword(),
                usuario.getAuthorities()
        );
    }

    private UsuarioDTO toDTO(Usuario u){
        UsuarioDTO dto = new UsuarioDTO();

        dto.setNickname(u.getNickname());
        dto.setNombreCompleto(u.getApellido()+", "+u.getNombre());
        dto.setEmail(u.getEmail());

        return dto;
    }
}
