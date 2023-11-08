
const PageNotFound = () => {
    return (
        <div>
            <img src="./public/404.svg" alt="" />
            <p>¡Ups! Parece que nos desviamos del camino.</p>
            <p>No te preocupes, puedes volver a la página de inicio para continuar tu aventura.</p>
            <button className="btn btn-primary" type="button">Volver al inicio</button>
        </div>
    )
}

export default PageNotFound;