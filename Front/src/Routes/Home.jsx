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
  const [search, setSearch] = useState("");

  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchUsed, setSearchUsed] = useState(false);

  const handleSearchSubmit = () => {
    setSearchSubmitted(true);
    setSearchUsed(true);
    setCurrentPage(1);
  };

  const handleSearchChange = (searchText) => {
    setSearch(searchText);
    setCurrentPage(1);
  };

  const filteredTours = result.filter((tour) => {
    const tourName = tour.titulo || "";
    return tourName.toLowerCase().includes(search.toLowerCase());
  });

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

  useEffect(() => {
    if (search === "") {
      setSearchUsed(false);
      setSearchSubmitted(false);
    }
  }, [search]);

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
  const currentTours = filteredTours.slice(firstTourIndex, lastTourIndex);

  return (
    <>
      <main>
        <Hero />
        <Search
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          search={search}
        />
        <CategoryNav />

        <section className="content-wrapper">
          {searchUsed ? (
            currentTours.length > 0 ? (
              <>
                <h1>Resultados para "{search}"</h1>
                <p className="mb-5 subtitle">
                  Explora los destinos que coinciden con tu búsqueda
                </p>
              </>
            ) : (
              <h1>No se encontraron resultados para "{search}"</h1>
            )
          ) : (
            <>
              <h1>Explora nuestros destinos destacados</h1>
              <p className="mb-5 subtitle">Descubre un mundo de posibilidades</p>
            </>
          )}

          <div className="cards-wrapper">
            {currentTours.length > 0 ? (
              currentTours.map((tour) => <Card data={tour} key={tour.id} />)
            ) : ''}
          </div>

          {filteredTours.length > toursPerPage && (
            <Pagination
              totalTours={filteredTours.length}
              toursPerPage={toursPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </section>

        <Banner />
      </main>
    </>
  );
};

export default Home;