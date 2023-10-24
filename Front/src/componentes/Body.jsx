import { Card } from "./Card"
import { Search } from "./Search"
import { Category } from "./Category"
import { Cover } from "./Cover"
import '../style/Body.css'
export function Body(){
    return (
        <>
                <div className="cover">
                    <Cover></Cover>
                </div>
                <div className="search">
                    <Search></Search>
                </div>
                <div className="category">
                    <Category></Category>
                </div>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
                
                <h2>Categorias</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
                <h2>Recomendaciones</h2>
                <div className="body">
                    <Card></Card>
                    <Card></Card>
                </div>
        </>
    )
}