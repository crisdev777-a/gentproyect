import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './HistoricalEventsGame.css';

// Datos de eventos históricos sin los años
const eventsData = [
  { event: "Descubrimiento de América", year: 1492 },
  { event: "Revolución Francesa", year: 1789 },
  { event: "Primera Guerra Mundial", year: 1914 },
  { event: "Segunda Guerra Mundial", year: 1939 },
  { event: "Caída del Muro de Berlín", year: 1989 },
  { event: "Llegada del hombre a la Luna", year: 1969 },
  { event: "Guerra de Independencia de los Estados Unidos", year: 1775 },
  { event: "Proclamación de la Independencia de México", year: 1810 },
  { event: "Inicio de la Revolución Industrial", year: 1760 },
  { event: "Pandemia de COVID-19", year: 2019 },
  { event: "Creación de la ONU", year: 1945 },
  { event: "Fin del Apartheid en Sudáfrica", year: 1994 },
  { event: "Inauguración del Canal de Panamá", year: 1914 },
  { event: "Abdicación de Napoleón Bonaparte", year: 1814 },
  { event: "Invención de la imprenta por Gutenberg", year: 1440 }
];

// Función para mezclar los eventos aleatoriamente y seleccionar 4
const shuffleAndSelectEvents = (array) => {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4); // Selecciona solo 4 eventos
};

const EventCard = ({ event, index, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "event",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index); // Mueve la tarjeta a cualquier posición
        draggedItem.index = index; // Actualiza el índice del item arrastrado
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="event-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span className="event-number">{index + 1}</span> {/* Muestra el número */}
      {event.event}
    </div>
  );
};

const HistoricalEventsGame = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Para navegar de vuelta al inicio

  useEffect(() => {
    // Mezcla los eventos y selecciona 4 de ellos
    setEvents(shuffleAndSelectEvents([...eventsData]));
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedEvents = [...events];
    const [movedEvent] = updatedEvents.splice(fromIndex, 1); // Elimina el evento de su posición original
    updatedEvents.splice(toIndex, 0, movedEvent); // Inserta el evento en la nueva posición
    setEvents(updatedEvents); // Actualiza el estado con la nueva lista
  };

  const checkOrder = () => {
    // Verifica si los eventos están en orden cronológico correcto (sin mostrar los años)
    const isCorrect = events.every((event, index, arr) => {
      return index === 0 || arr[index - 1].year <= event.year;
    });

    if (isCorrect) {
      alert("¡Correcto! Los eventos están en el orden cronológico.");
      navigate('/'); // Navega de vuelta al inicio
    } else {
      alert("Algunos eventos no están en el orden correcto. Intenta de nuevo.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-container">
        <h2>Ordena los Eventos Históricos</h2>
        <div className="events-list">
          {events.map((event, index) => (
            <EventCard key={index} event={event} index={index} moveCard={moveCard} />
          ))}
        </div>
        <button className="check-button" onClick={checkOrder}>
          Verificar Orden
        </button>
      </div>
    </DndProvider>
  );
};

export default HistoricalEventsGame;
