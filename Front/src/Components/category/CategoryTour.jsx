import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const CategoryTour = ({ tourData, handleChange, categories }) => {
    const [categorias, setCategorias] = useState([]);
    const [descripcionCategoria, setDescripcionCategoria] = useState("");

    console.log(tourData.categoria)

    const handleCategoriaChange = (e) => {
        const selectedCategoriaId = e.target.value;
        console.log(selectedCategoriaId)
        if (selectedCategoriaId != 0) {
            const selectedCategoria = categorias.find((categoria) => parseFloat(categoria.id) === parseFloat(selectedCategoriaId));
            if (selectedCategoria) {
                setDescripcionCategoria(selectedCategoria.descripcion);
            } else {
                setDescripcionCategoria("");
            }
            handleChange(e);
        }else{
            setDescripcionCategoria("");
        }
    };

    useEffect(() => {
        fetch("http://localhost:8089/categoria")
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
            })
            .catch((error) => {
                console.error("Error al obtener las categorías: \n", error);
            });
    }, []);

    return (
        <>
            <div className="col">
                <div className="form-group mb-3">
                    <small>Categoria*</small>
                    <select className="form-control" name="categoria" type="number" value={tourData.categoria} onChange={handleCategoriaChange} required>
                        <option  key={0} value={0}>Seleccione...</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}> {categoria.nombre} </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col">
                <div className="form-group mb-3">
                    <small>Descripción de la categoría</small>
                    <p>{descripcionCategoria}</p>
                </div>
            </div>
        </>
    );
}

CategoryTour.propTypes = {
    tourData: PropTypes.shape({
        categoria: PropTypes.number.isRequired,
        categories: PropTypes.array.isRequired,
    }).isRequired,
    handleChange: PropTypes.func.isRequired
};

export default CategoryTour;