import '../style/Category.css'
import playa from '../assets/Playa.png'
import nieve from '../assets/Nieve.png'
import naturales from '../assets/Naturales.png'
import desafiantes from '../assets/Desafiantes.png'
import gastronomicos from '../assets/Gastronomicas.png'
import exoticos from '../assets/Exoticas.png'

export function Category() {
    return (
        <div className='category-container'>
            <h5>Descubre tu próxima aventura</h5>
            <div className='category-icons'>
                <div className='category-button'>
                    <img src={playa} alt="img" />
                    <strong>Playas</strong>
                </div>
                <div className='category-button'>
                    <img src={nieve} alt="img" />
                    <strong>Nieve</strong>
                </div>
                <div className='category-button'>
                    <img src={naturales} alt="img" />
                    <strong>Naturales</strong>
                </div>
                <div className='category-button'>
                    <img src={desafiantes} alt="img" />
                    <strong>Desafiantes</strong>
                </div>
                <div className='category-button'>
                    <img src={gastronomicos} alt="img" />
                    <strong>Gastronómicas</strong>
                </div>
                <div className='category-button'>
                    <img src={exoticos} alt="img" />
                    <strong>Exóticas</strong>
                </div>
            </div>

        </div>
    )
}