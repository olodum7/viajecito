import '../style/Category.css'
import playa from '../assets/playa.svg'
import nieve from '../assets/nieve.svg'
import naturales from '../assets/naturales.svg'
import desafiantes from '../assets/desafiantes.svg'
import gastronomicos from '../assets/gastronomicas.svg'
import exoticos from '../assets/exoticas.svg'

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