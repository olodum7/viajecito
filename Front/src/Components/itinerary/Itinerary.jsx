import React from "react";

function formatItineraryText(rawText) {
  if (!rawText) {
    return null;
  }

  const sections = rawText.split(/Día \d+ - /).filter((section) => section.trim() !== "");

  const formattedSections = sections.map((section, index) => {
    // Agregar "Día X - " al principio de la sección si no está presente
    const sectionWithDay = section.startsWith("Día ") ? section : `Día ${index + 1} - ${section}`;

    const [titleAndContent, ...paragraphs] = sectionWithDay.split(".");
    const [title, content] = titleAndContent.split(". ");

    // Verifica si content está vacío antes de renderizar el párrafo
    const contentElement = content ? <p className="p-0 m-0">{content}</p> : null;

    return (
      <span key={index} className="p-0 mb-4">
        <h4 className="p-0 m-0">{title}</h4>
        {contentElement}
        {paragraphs.length > 0 && (
          <p className="p-0 m-0">{paragraphs.join(". ")}</p>
        )}
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
