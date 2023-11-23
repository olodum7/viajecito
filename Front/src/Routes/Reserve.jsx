
// import { useEffect, useState } from "react";
// import Image from "../Components/image/Image";
// import { parseJSON } from "date-fns";

const Reserve = () => {
    // const [datoReserve, setDatoReserve] = useState({});

    // useEffect(() => {
    //     const datoAlmacenado = localStorage.getItem('datosReserva');
    //     setDatoReserve(datoAlmacenado);
    //     console.log(parseJSON(datoAlmacenado))
    //     console.log(datoAlmacenado)
    //     localStorage.removeItem('datosReserva')
    // }, []);

    // const { id, titulo, subtitulo, precioFinal, categoria, duracion, dificultad, fechaSalida, imagen, mayores, menores } = datoReserve;
    // console.log(datoReserve)

    // const [mensaje, setMensaje] = useState("");
    // const reserveData = {
    //     fechaSalida: fechaSalida,
    //     username: "",
    //     mayores: mayores,
    //     menores: menores,
    //     tour: id
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     /* Obtengo el usuario */
    //     const email = localStorage.getItem("userData").email;
    //     reserveData.username = email;

    //     const formData = new FormData();
    //     Object.entries(reserveData).forEach(([key, value]) => {
    //         formData.append(key, value);
    //     });

    //     console.log(formData)

    //     fetch("http://localhost:8089/reserve", {
    //         method: "POST",
    //         body: formData
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setMensaje({ tipo: data.tipo, texto: data.mensaje });
    //         })
    //         .catch((error) => {
    //             console.error("Error al enviar el tour:", error);
    //         });
    // };
    
    return (
        <main>
            {/* <section>
                <div className="row">
                    <div className="col">
                        <Image key={imagen} id={imagen} />
                    </div>
                    <div className="col">
                        <h1>{id + "-" + titulo}</h1>
                        <h2> {subtitulo} </h2>
                        <h3>{categoria}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p>{duracion}</p>
                        <p>{dificultad}</p>
                        <p>{fechaSalida}</p>
                        <p>Precio: USD {precioFinal}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn" type="button" onClick={handleSubmit}>Reservar</button>
                    </div>
                </div>
                {mensaje && (
                    <div className={`mt-3 alert alert-${mensaje.tipo === "error" ? "danger" : "success"}`} >
                        {mensaje.texto}
                    </div>
                )}
            </section> */}
        </main>
    )
}

export default Reserve;