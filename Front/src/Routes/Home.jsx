import { useState, useEffect } from "react";
import Card from "../Components/card/Card.jsx";
import Banner from "../Components/ui-components/banner/Banner";
import Hero from "../Components/ui-components/hero/Hero";
import CategoryNav from "../Components/category/CategoryNav";
import { Search } from "../Components/search/Search";
import Pagination from "../Components/ui-components/pagination/Pagination.jsx";

const Home = () => {
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(6);

  useEffect(() => {
    fetch("http://localhost:8089/tour")
      .then((response) => response.json())
      .then((data) => {
        // Mezcla aleatoriamente el array de tours una vez al cargar los datos iniciales
        const shuffledTours = randomArray(data);
        setResult(shuffledTours);
      })
      .catch((error) => {
        console.error("Error al obtener los tours: \n", error);
      });
  }, []);

  // Función para mostrar las cards de manera aleatoria
  const randomArray = (array) => {
    const random = [...array];
    for (let i = random.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [random[i], random[j]] = [random[j], random[i]];
    }
    return random;
  };

  const lastTourIndex = currentPage * toursPerPage;
  const firstTourIndex = lastTourIndex - toursPerPage;
  const currentTours = result.slice(firstTourIndex, lastTourIndex);

  return (
    <>
      <main>
        <Hero />
        <Search />
        <CategoryNav />

        <section className="content-wrapper">
          <h1>Explora nuestros destinos destacados</h1>
          <p className="mb-5 subtitle">Descubre un mundo de posibilidades</p>
          <div className="cards-wrapper">
            {currentTours.map((tour) => (
              <Card data={tour} key={tour.id} />
            ))}
          </div>
          <Pagination
            totalTours={result.length}
            toursPerPage={toursPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </section>

        <Banner />
      </main>
    </>
  );
};

export default Home;
