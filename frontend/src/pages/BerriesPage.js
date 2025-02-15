import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BerriesPage.css';

const Berries = () => {
  const [berries, setBerries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerries = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/berry?limit=64');
        const results = response.data.results;
        
        const berryDetails = await Promise.all(
          results.map(async (berry) => {
            const detail = await axios.get(berry.url);
            return detail.data;
          })
        );
        
        setBerries(berryDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching berries:', error);
        setLoading(false);
      }
    };

    fetchBerries();
  }, []);

  if (loading) {
    return <div className="loading">Cargando Bayas...</div>;
  }

  return (
    <div className="berries-container">
      <h1>Bayas Pokémon</h1>
      <div className="berries-grid">
        {berries.map((berry) => (
          <div key={berry.id} className="berry-card">
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`}
              alt={berry.name}
              className="berry-image"
            />
            <h3>{berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}</h3>
            <div className="berry-info">
              <p>Tamaño: {berry.size}cm</p>
              <p>Tiempo de crecimiento: {berry.growth_time}h</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berries;
