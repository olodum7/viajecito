package com.viajecito.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.viajecito.api.dto.CategoriaDTO;
import com.viajecito.api.exception.BadRequestException;
import com.viajecito.api.model.Categoria;
import com.viajecito.api.repository.ICategoriaRepository;
import com.viajecito.api.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {
    @Autowired
    private ICategoriaRepository categoriaRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public CategoriaDTO agregar(CategoriaDTO categoriaDTO) throws BadRequestException {
        /**** Controlo ingreso repetido ****/
        if(categoriaRepository.findByNombre(categoriaDTO.getNombre()).isPresent())
            throw new BadRequestException("Ya existe una categoria con los datos ingresados");
        return mapper.convertValue(categoriaRepository.save(mapper.convertValue(categoriaDTO, Categoria.class)), CategoriaDTO.class);
    }

    @Override
    public void eliminar(Long id) throws BadRequestException {
        /**** Controlo que exista ****/
        if(!buscarPorId(id).isPresent())
            throw new BadRequestException("La categoria a eliminar no existe.");
        categoriaRepository.deleteById(id);
    }

    @Override
    public CategoriaDTO modificar(Categoria categoria) throws BadRequestException {
        /**** Controlo que el nombre no se repita ****/
        if(categoriaRepository.findByNombre(categoria.getNombre()).isPresent())
            throw new BadRequestException("Ya existe una categoria con el nombre ingresado.");
        return toDTO(categoriaRepository.save(categoria));
    }

    @Override
    public Optional<CategoriaDTO> buscarPorId(Long id){
        Optional<Categoria> encontrada = categoriaRepository.findById(id);
        return encontrada.map(categoria -> toDTO(categoria));
    }

    @Override
    public Collection<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    private CategoriaDTO toDTO(Categoria c){
        return mapper.convertValue(c, CategoriaDTO.class);
    }

    private  Categoria toModel(CategoriaDTO c){
        return mapper.convertValue(c, Categoria.class);
    }
}
