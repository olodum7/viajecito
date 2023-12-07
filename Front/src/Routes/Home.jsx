import { useState, useEffect } from "react";
import Card from "./../Components/card/Card.jsx";
import Banner from "./../Components/ui-components/banner/Banner";
import Hero from "./../Components/ui-components/hero/Hero";
import CategoryNav from "./../Components/category/CategoryNav";
import Search from "./../Components/search/Search";
import Pagination from "./../Components/ui-components/pagination/Pagination.jsx";

const Home = () => {
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 6;
  const [clickedCategoryName, setClickedCategoryName] = useState("");
  const [startDate, setStartDate] = useState(null);  
  const [endDate, setEndDate] = useState(null);     
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

  useEffect(() => {
    fetch("http://34.207.134.182:8089/tour")
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
    const { startDate, endDate } = filter;
    setStartDate(startDate || null);
    setEndDate(endDate || null);
    setCurrentPage(1); // Resetear la página
  };

  useEffect(() => {
    if (!startDate && !endDate) {
      // Si no hay filtros de fecha, mostrar todos los tours
      setResult(result);
    }
  }, [startDate, endDate]);

  const filteredTours = result.filter((tour) => {
    const tourName = tour.titulo || "";
    const fechaDesde = new Date(tour.salidaDTO.fechaSalidaDesde)
    const fechaHasta = new Date(tour.salidaDTO.fechaSalidaHasta)

    const categoryFilter = !clickedCategoryName || tour.categoria === clickedCategoryName;
    const dateFilter = (endDate === null || startDate >= fechaDesde && startDate <= fechaHasta);
    const searchFilter = tourName.toLowerCase().includes(search.toLowerCase());
  
    return categoryFilter && dateFilter && searchFilter;
  });  

  useEffect(() => {
    if (search === "") {
      setSearchUsed(false);
      setSearchSubmitted(false);
    }
  }, [search]);

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
        <Search
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchClick={handleSearchClick}
          startDate={startDate}
          endDate={endDate}
          search={search}
        />

        <CategoryNav
          clickedCategoryName={clickedCategoryName}
          onCategoryClick={handleCategoryClick}
        />
        <section className="content-wrapper">
          {searchUsed ? (
            currentTours.length > 0 ? (
              <>
                <h1>Resultados para: {search}</h1>
                <p className="mb-5 subtitle">
                  Explora los destinos que coinciden con tu búsqueda
                </p>
              </>
            ) : (
              <h1>No se encontraron resultados para: {search}</h1>
            )
          ) : (
            <>
              <h1>Explora nuestros destinos destacados</h1>
              <p className="mb-5 subtitle">
                Descubre un mundo de posibilidades
              </p>
            </>
          )}

          <div className="cards-wrapper">
            {currentTours.length > 0
              ? currentTours.map((tour) => <Card data={tour} key={tour.id} />)
              : ""}
          </div>

          {filteredTours.length > toursPerPage && (
            <Pagination
              total={filteredTours.length}
              perPage={toursPerPage}
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
