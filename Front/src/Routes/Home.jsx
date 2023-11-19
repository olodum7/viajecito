import { useState, useEffect } from "react";
import Card from "../Components/card/Card.jsx";
import Banner from "../Components/ui-components/banner/Banner";
import Hero from "../Components/ui-components/hero/Hero";
import CategoryNav from "../Components/category/CategoryNav";
import Search from "../Components/search/Search";
import Pagination from "../Components/ui-components/pagination/Pagination.jsx";

const Home = () => {
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setToursPerPage] = useState(10);
  const [clickedCategoryName, setClickedCategoryName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

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

  /* Filtros por categoria */
  const handleCategoryClick = (categoryName) => {
    // Si la misma categoría está clickeada nuevamente, resetea el filtro
    setClickedCategoryName((prevCategoryName) =>
      prevCategoryName === categoryName ? null : categoryName
    );
  };

  /* Filtros por fecha */
  const handleSearchClick = (filter) => {
    const { startDate, endDate} = filter;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const filteredTours = result.filter((tour) => {
    const fechaDesdeArray = tour.salidaDTO.fechaSalidaDesde;
    const fechaHastaArray = tour.salidaDTO.fechaSalidaHasta;

    const fechaDesde = new Date(fechaDesdeArray[0], fechaDesdeArray[1] - 1, fechaDesdeArray[2])
    const fechaHasta = new Date(fechaHastaArray[0], fechaHastaArray[1] - 1, fechaHastaArray[2])

    const categoryFilter = !clickedCategoryName || tour.categoria === clickedCategoryName;
    const dateFilter =
      (endDate === null || startDate >= fechaDesde && startDate <= fechaHasta);
    return categoryFilter && dateFilter;

  });

  // Función para mostrar las cards de manera aleatoria
  const randomArray = (array) => {
    const random = [...array];
    random.sort(() => Math.random() - 0.5);
    return random;
  };

  const lastTourIndex = currentPage * toursPerPage;
  const firstTourIndex = lastTourIndex - toursPerPage;
  const currentTours = filteredTours.slice(firstTourIndex, lastTourIndex);

  return (
    <>
      <main>
        <Hero />
        <Search onSearchClick={handleSearchClick} />
        <CategoryNav clickedCategoryName={clickedCategoryName} onCategoryClick={handleCategoryClick} />

        <section className="content-wrapper">
          <h1>Explora nuestros destinos destacados</h1>
          <p className="mb-5 subtitle">Descubre un mundo de posibilidades</p>
          <div className="cards-wrapper">
            {currentTours.length === 0 &&
              <p>No hay tours disponibles con los filtros seleccionados.</p>}

            {currentTours.map((tour) => (
              <Card data={tour} key={tour.id} />
            ))}
          </div>
          <Pagination totalTours={result.length} toursPerPage={toursPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </section>

        <Banner />
      </main>
    </>
  );
};

export default Home;