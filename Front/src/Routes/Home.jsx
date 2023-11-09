import { useState, useEffect } from "react";
import Card from "../Components/card/Card.jsx";
import Banner from "../Components/ui-components/banner/Banner";
import Hero from "../Components/ui-components/hero/Hero";
import CategoryNav from "../Components/category/CategoryNav";
import { Search } from "../Components/search/Search";

const Home = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch("http://localhost:8089/tour")
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error("Error al obtener los tours: \n", error);
      });
  }, []);

  // Función para mostrar las cards de manera aleatoria cada vez que se ingresa al sitio
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
      <Hero />
      <Search/>
      <CategoryNav />

      <section className="content-wrapper">
        <h1>Explora nuestros destinos destacados</h1>
        <p className="mb-5 subtitle">Descubre un mundo de posibilidades</p>
        <div className="cards-wrapper">
          {shuffledTours.map((tour) => (
            <Card data={tour} key={tour.id} />
          ))}
        </div>
      </section>
  
      <Banner />
    </main>
  );
};

export default Home;
