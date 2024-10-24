import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import './HistoricalEventsGame.css';

// Función para mezclar y seleccionar eventos
const shuffleAndSelectEvents = (eventsArray, numberOfEvents = 5) => {
  const shuffled = eventsArray.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numberOfEvents);
};

// Datos de eventos (25 eventos ahora)
=======
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './HistoricalEventsGame.css';

// Datos de eventos históricos sin los años
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
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
<<<<<<< HEAD
  { event: "Invención de la imprenta por Gutenberg", year: 1440 },
  { event: "Batalla de Waterloo", year: 1815 },
  { event: "Fundación de Roma", year: -753 },
  { event: "Caída del Imperio Romano de Occidente", year: 476 },
  { event: "Asesinato de Julio César", year: -44 },
  { event: "Declaración de los Derechos Humanos", year: 1948 },
  { event: "Independencia de la India", year: 1947 },
  { event: "Primera vacuna contra la viruela", year: 1796 },
  { event: "Crisis de los Misiles en Cuba", year: 1962 },
  { event: "Guerra de Vietnam", year: 1955 },
  { event: "Creación de la primera computadora ENIAC", year: 1945 }
];

=======
  { event: "Invención de la imprenta por Gutenberg", year: 1440 }
];

// Función para mezclar los eventos aleatoriamente y seleccionar 4
const shuffleAndSelectEvents = (array) => {
  const shuffled = array.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4); // Selecciona solo 4 eventos
};

>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
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
<<<<<<< HEAD
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
=======
        moveCard(draggedItem.index, index); // Mueve la tarjeta a cualquier posición
        draggedItem.index = index; // Actualiza el índice del item arrastrado
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="event-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
<<<<<<< HEAD
      <span className="event-number">{index + 1}</span>
=======
      <span className="event-number">{index + 1}</span> {/* Muestra el número */}
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
      {event.event}
    </div>
  );
};

const HistoricalEventsGame = () => {
  const [events, setEvents] = useState([]);
<<<<<<< HEAD
  const [playedEvents, setPlayedEvents] = useState([]); // Para almacenar eventos ya jugados
  const [level, setLevel] = useState(1); // Controlar el nivel
  const navigate = useNavigate();

  useEffect(() => {
    loadNextLevel();
  }, [level]);

  const loadNextLevel = () => {
    const remainingEvents = eventsData.filter(event => !playedEvents.includes(event));
    const selectedEvents = shuffleAndSelectEvents(remainingEvents, 5);
    setEvents(selectedEvents);
    setPlayedEvents([...playedEvents, ...selectedEvents]);
  };

  const moveCard = (fromIndex, toIndex) => {
    const updatedEvents = [...events];
    const [movedEvent] = updatedEvents.splice(fromIndex, 1);
    updatedEvents.splice(toIndex, 0, movedEvent);
    setEvents(updatedEvents);
  };

  const checkOrder = () => {
=======
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
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
    const isCorrect = events.every((event, index, arr) => {
      return index === 0 || arr[index - 1].year <= event.year;
    });

    if (isCorrect) {
<<<<<<< HEAD
      if (level < 5) {
        alert(`¡Correcto! Nivel ${level} completado.`);
        setLevel(level + 1); // Avanza al siguiente nivel
      } else {
        alert("¡Felicidades! Has completado todos los niveles.");
        navigate('/');
      }
=======
      alert("¡Correcto! Los eventos están en el orden cronológico.");
      navigate('/'); // Navega de vuelta al inicio
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
    } else {
      alert("Algunos eventos no están en el orden correcto. Intenta de nuevo.");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="game-container">
<<<<<<< HEAD
        <h2>Ordena los Eventos Históricos - Nivel {level}</h2>
=======
        <h2>Ordena los Eventos Históricos</h2>
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
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
