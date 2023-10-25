import React from "react";
import Card from "../Components/Card";
import mockTours from "./../Components/utils/mock.tours";

const Home = () => {
  // Función para mostrar las cards de manera aleatoria cada vez que se ingrea al sitio
  const randomArray = (array) => {
    const random = [...array];
    for (let i = random.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [random[i], random[j]] = [random[j], random[i]];
    }
    return random;
  };

  // Mezclar aleatoriamente el array mockTours
  const shuffledTours = randomArray(mockTours);

  return (
    <main>
      <section className="content-wrapper">
        <div className="work-wrapper">
          {shuffledTours.map((tour) => (
            <Card data={tour} key={tour.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
