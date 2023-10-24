import { Card } from "./Card"
import { Search } from "./Search"
import '../style/Body.css'
export function Body(){
    return (
        <>
            <div>
                <h2>Busca tu vuelo</h2>
                <div className="search">
                    <Search></Search>
                </div>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
                
            </div>
            <div>
                <h2>Categorias</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
            <div>
                <h2>Recomendaciones</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
        </>
    )
}