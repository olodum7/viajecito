package com.viajecito.api.controller;

import com.viajecito.api.dto.TourDTO;
import com.viajecito.api.dto.UsuarioDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.MensajeRespuesta;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.service.impl.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<?> nuevoUsuario(@RequestParam("nombre") String nombre,
                                          @RequestParam("apellido") String apellido,
                                          @RequestParam("email") String email,
                                          @RequestParam("password") String password) throws BadRequestException {
        Usuario usuario = new Usuario();
        try {
            usuario.setNombre(nombre);
            usuario.setApellido(apellido);
            usuario.setEmail(email);
            usuario.setNombre(nombre);
            usuario.setPassword(password);
            usuario.setAuthorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));

            return ResponseEntity.ok(new MensajeRespuesta("ok", "Bienvenid@ " + usuarioService.registrar(usuario).getNombreCompleto() + ", el registro fue exitoso"));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
    }

    @GetMapping
    public UserDetails iniciarSesion(@RequestParam("email") String email,
                                     @RequestParam("password") String password){
        return usuarioService.loadUserByUsername(email);
    }

    @GetMapping(path = "/todos")
    public List<Usuario> listarTodos(){
        return usuarioService.listarTodos();
    }
}
