import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AbilitiesPage.css';

const Abilities = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerHabilidades = async () => {
      try {
        const respuesta = await axios.get('https://pokeapi.co/api/v2/ability?limit=100');
        const resultados = respuesta.data.results;
        
        const detallesHabilidades = await Promise.all(
          resultados.map(async (habilidad) => {
            const detalle = await axios.get(habilidad.url);
            return detalle.data;
          })
        );
        
        setHabilidades(detallesHabilidades);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar habilidades:', error);
        setCargando(false);
      }
    };

    obtenerHabilidades();
  }, []);

  if (cargando) {
    return <div className="cargando">Cargando Habilidades...</div>;
  }

  return (
    <div className="contenedor-habilidades">
      <h1>Habilidades Pokémon</h1>
      <div className="grid-habilidades">
        {habilidades.map((habilidad) => (
          <div key={habilidad.id} className="tarjeta-habilidad">
            <div className="cabecera-habilidad">
              <h3>{habilidad.names.find(name => name.language.name === "es")?.name || habilidad.name}</h3>
            </div>
            <div className="info-habilidad">
              <p>{habilidad.flavor_text_entries.find(entry => entry.language.name === "es")?.flavor_text || 
                  habilidad.effect_entries.find(entry => entry.language.name === "en")?.short_effect}</p>
              <div className="detalles-habilidad">
                <span>ID: {habilidad.id}</span>
                <span>Generación: {habilidad.generation.name.split('-')[1].toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
