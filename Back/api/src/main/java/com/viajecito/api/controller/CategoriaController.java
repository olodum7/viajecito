package com.viajecito.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.CategoriaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Categoria;
import com.viajecito.api.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private ICategoriaService categoriaService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping
    public ResponseEntity<?> agregar(@RequestBody CategoriaDTO categoriaDTO) throws BadRequestException {
        return ResponseEntity.ok(categoriaService.agregar(categoriaDTO));
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) throws BadRequestException {
        try{
            categoriaService.eliminar(id);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible eliminar la categoria: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("");
    }

    @PutMapping
    public ResponseEntity<?> modificar(@RequestBody Categoria categoria) throws BadRequestException {
        try {
            categoriaService.modificar(categoria);
        } catch (BadRequestException e) {
            throw new BadRequestException("No es posible modificar la categoria: " + e);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Categoria modificada correctamente.");
    }

    @GetMapping(path = "/{id}")
    public Optional<CategoriaDTO> buscarPorId(@PathVariable Long id){
        return categoriaService.buscarPorId(id);
    }

    @GetMapping
    public Collection<Categoria> listarTodos(){
        return categoriaService.listarTodas();
    }
}
