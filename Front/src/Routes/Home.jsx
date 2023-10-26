import React from 'react';
import { useEffect, useState } from 'react'
import Card from "../Components/Card";
import { Search } from "../Components/Search"
import { Category } from "../Components/Category"
import { Cover } from "../Components/Cover"

const Home = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("http://localhost:8089/tour")
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tours: \n", error)
      })
  }, [])

  // Función para mostrar las cards de manera aleatoria cada vez que se ingrea al sitio
  const randomArray = (array) => {
    const random = [...array];
    for (let i = random.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [random[i], random[j]] = [random[j], random[i]];
    }
    return random;
  };

  // Mezclar aleatoriamente el array de tours
  const shuffledTours = randomArray(result);

  return (
    <main>
      <section className="content-wrapper">
        <div>
          <div className="cover">
            <Cover></Cover>
          </div>
          <div className="search">
            <Search></Search>
          </div>
          <div className="category">
            <Category></Category>
          </div>
          <div className="subtitles">
            <h2>Explora nuestros destinos destacados</h2>
            <h4>Descubre un mundo de posibilidades</h4>
          </div>
        </div>
        <div className="work-wrapper">
          {shuffledTours.map((tour) => (
            <Card key={tour.id} id={tour.id} nombre={tour.nombre} descripcion={tour.descripcion} precio={tour.precio} categoria={tour.categoria} imagenes={tour.imagenes} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;