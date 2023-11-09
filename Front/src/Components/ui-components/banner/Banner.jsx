const Banner = () => {
  return (
    <section id="banner">
      <div className="container">
        <div className="row">
          <div className="col-12 col-xl-7">
            <h2>Viajecito: Tu Pasaporte a la Aventura</h2>
            <p>
              En <strong className="secondary-color">Viajecito</strong>,
              entendemos tu pasión por explorar el mundo y crear recuerdos
              inolvidables. Somos tu compañero de confianza en cada paso del
              camino, diseñando experiencias que te emocionarán. Desde los
              destinos más remotos hasta los tesoros locales, te llevamos a
              donde siempre has soñado. Únete a nosotros y descubre un mundo
              lleno de aventuras, diversidad y oportunidades.{" "}
              <strong>Tu aventura empieza hoy</strong>.
            </p>
          </div>
          <div className="col-12 col-xl-5">
            <div className="banner-illustration">
              <img src="./illustration-footer.svg" className="h-8" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
