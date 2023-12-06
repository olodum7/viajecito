import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const CategoryTour = ({ tourData, handleChange, className }) => {
    const [categorias, setCategorias] = useState([]);
    const [descripcionCategoria, setDescripcionCategoria] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState(0);

    const handleCategoriaChange = (e) => {
        const selectedCategoriaId = e.target.value;
        if (selectedCategoriaId != 0) {
            const selectedCategoria = categorias.find((categoria) => parseFloat(categoria.id) === parseFloat(selectedCategoriaId));
            if (selectedCategoria) {
                setDescripcionCategoria(selectedCategoria.descripcion);
            } else {
                setDescripcionCategoria("");
            }
            setSelectedCategoria(selectedCategoriaId);
            handleChange(e);
        } else {
            setDescripcionCategoria("");
            setSelectedCategoria(0);
        }
    };

    useEffect(() => {
        fetch("http://54.92.136.117:8089/categoria")
            .then((response) => response.json())
            .then((data) => {
                setCategorias(data);
                if (tourData.categoriaNom && tourData.categoriaNom !== "") {
                    const categoriaNombre = data.find((categoria) => categoria.nombre === tourData.categoriaNom);
                    if (categoriaNombre) {
                        setSelectedCategoria(parseInt(categoriaNombre.id));
                        setDescripcionCategoria(categoriaNombre.descripcion);
                    }
                }
            })
            .catch((error) => {
                console.error("Error al obtener las categorías: \n", error);
            });
    }, [tourData.categoriaNom]);

    return (
        <>
            <div className="col">
                <div className="form-group mb-3">
                    <small>Categoria*</small>
                    <select type="number" className={className} id="categoria" value={selectedCategoria} onChange={handleCategoriaChange}>
                        <option key={0} value={0}>Seleccione...</option>
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
        categoria: PropTypes.number,
        categoriaNom: PropTypes.string,
    }).isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default CategoryTour;