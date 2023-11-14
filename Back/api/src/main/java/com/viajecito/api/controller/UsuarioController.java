package com.viajecito.api.controller;

import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.MensajeRespuesta;
import com.viajecito.api.model.Usuario;
import com.viajecito.api.service.impl.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

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

            return ResponseEntity.ok(new MensajeRespuesta("ok", "Te damos la bienvenida " + usuarioService.registrar(usuario).getNombre() + ", el registro fue exitoso."));
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(new MensajeRespuesta("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> iniciarSesion(@RequestParam("email") String email,
                                           @RequestParam("password") String password) {

        System.out.println(email);
        System.out.println(password);
        try {
            UserDetails userDetails = usuarioService.loadUserByUsername(email);

            if (usuarioService.isPasswordMatch(userDetails.getPassword(), password)) {
                return ResponseEntity.ok(new MensajeRespuesta("ok", "Inicio de sesión exitoso."));
            } else {
                // La contraseña no coincide
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new MensajeRespuesta("error", "Contraseña incorrecta."));
            }
        } catch (UsernameNotFoundException e) {
            // Usuario no encontrado
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MensajeRespuesta("error", "Usuario no encontrado."));
        } catch (Exception e) {
            // Otros errores
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MensajeRespuesta("error", "Error interno del servidor."));
        }
    }

    @GetMapping("/")
    public UserDetails getNombreApellidoPorEmail(@RequestParam("email") String email) {
        UserDetails usuario = usuarioService.loadUserByUsername(email);
        return usuario;
    }

    @GetMapping(path = "/todos")
    public List<Usuario> listarTodos(){
        return usuarioService.listarTodos();
    }
}
