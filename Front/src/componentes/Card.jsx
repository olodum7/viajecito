import '../style/Card.css'
import estrella from '../assets/estrella.png'
import reloj from '../assets/reloj.png'
import frecuencia from '../assets/frecuencia.png'
import calendario from '../assets/calendario.png'

export function Card(){
    return (
        
        <div className='card'>
            <img src="data:image/jpeg;base64,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" alt="img" />
            <h3>Nombre destino del viaje</h3>
            <h5><strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, tenetur impedit, assumenda quae, dignissimos eum dolores voluptatem deleniti eaque eos quasi? Unde, ipsa magnam ab perspiciatis laudantium delectus culpa earum!</strong></h5>
            <div className='cardInfo'>
                <p className='cardInfoP'>Desde <strong>{`USD valor`}</strong></p>
                <button className='cardButton'>Reservar</button>
            </div>
            <hr />
            <div className='cardInfoExtra'>
                <div className='cardInfoExtraContent'>
                    <img src={estrella} alt="" />
                    <p>texto</p>
                </div>
                <div className='cardInfoExtraContent'>
                    <img src={reloj} alt="" />
                    <p>texto</p>
                </div>
                <div className='cardInfoExtraContent'>
                    <img src={frecuencia} alt="" />
                    <p>texto</p>
                </div>
                <div className='cardInfoExtraContent'>
                    <img src={calendario} alt="" />
                    <p>texto</p>
                </div>
            </div>
        </div>
        
    )
}
