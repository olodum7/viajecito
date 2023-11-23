function formatItineraryText(rawText) {
  if (!rawText) {
    return null;
  }

  const sections = rawText.split(/Día \d+ - /).filter((section) => section.trim() !== "");

  const formattedSections = sections.map((section, index) => {
    // Agregar "Día X - " al principio de la sección si no está presente
    const sectionWithDay = section.startsWith("Día ") ? section : `Día ${index + 1} - ${section}`;

    const paragraphs = sectionWithDay.split(/\n/).filter((paragraph) => paragraph.trim() !== "");

    const elements = paragraphs.map((paragraph, paragraphIndex) => {
      if (paragraph.includes("Mañana:")) {
        return (
          <div key={paragraphIndex}>
            <h5>Mañana:</h5>
            <p>{paragraph.replace("Mañana:", "")}</p>
          </div>
        );
      } else if (paragraph.includes("Tarde:")) {
        return (
          <div key={paragraphIndex}>
            <h5>Tarde:</h5>
            <p>{paragraph.replace("Tarde:", "")}</p>
          </div>
        );
      } else if (paragraph.includes("Noche:")) {
        return (
          <div key={paragraphIndex}>
            <h5>Noche:</h5>
            <p>{paragraph.replace("Noche:", "")}</p>
          </div>
        );
      } else {
        return <p key={paragraphIndex}>{paragraph}</p>;
      }
    });

    return (
      <span key={index} className="p-0 mb-4">
        <h4 className="p-0 m-0">{elements[0]}</h4>
        {elements.slice(1)}
      </span>
    );
  });

  return formattedSections;
}

function Itinerary({ itineraryText }) {
  const formattedItinerary = formatItineraryText(itineraryText);

  return <>{formattedItinerary}</>;
}

export default Itinerary;
