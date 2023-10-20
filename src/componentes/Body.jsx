import { Card } from "./Card"
import './style/Body.css'
export function Body(){
    return (
        <>
            <div>
                <h2>Buscador</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
                
            </div>
            <div>
                <h2>Categorias</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
            <div>
                <h2>Recomendaciones</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
        </>
    )
}