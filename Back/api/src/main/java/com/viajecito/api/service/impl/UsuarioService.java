package com.viajecito.api.service.impl;

import com.viajecito.api.dto.UsuarioDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
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
            throw new BadRequestException("Ya existe un usuario con el email: " + usuario.getEmail() + " ingresado.");
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

        System.out.println("hola");
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado."));
        System.out.println("encontre usuario");
        return usuario;
    }

    private UsuarioDTO toDTO(Usuario u){
        UsuarioDTO dto = new UsuarioDTO();

        dto.setNickname(u.getNickname());
        dto.setNombre(u.getNombre());
        dto.setNombreCompleto(u.getApellido()+", "+u.getNombre());
        dto.setEmail(u.getEmail());

        return dto;
    }

    public boolean isPasswordMatch(String passInDB, String password) {
        System.out.println(passInDB);
        return passInDB.equals(password);
    }
}
