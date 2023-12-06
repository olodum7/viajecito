import Button from "./../Components/buttons/Button";

const NotFound = () => {
    return (
        <main>
            <div className="container-error">
                <img src="/404.svg" alt="" />
                <h1>¡Ups! Parece que nos desviamos del camino.</h1>
                <p>No te preocupes, puedes volver a la página de inicio para continuar tu aventura.</p>
                <Button url={'/'} buttonName="Volver al inicio" />
            </div>
        </main>
    )
}
export default NotFound;