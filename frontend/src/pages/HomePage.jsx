 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonSearch from '../components/pokemon/PokemonSearch';
import axios from 'axios';
import './HomePage.css';

const API_URL = "http://127.0.0.1:8000/api";

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('');

  const handleSearch = async (query, filter) => {
    setSearchType(filter);
    let url = '';

    if (filter === 'pokemon') {
      url = `${API_URL}/search/?query=${query}`;
    } else if (filter === 'habilidad') {
      url = `${API_URL}/abilities/`;
    } else if (filter === 'baya') {
      url = `${API_URL}/berries/`;
    }

    try {
      const response = await axios.get(url);
      setSearchResults(response.data.results || response.data);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      setSearchResults([]);
    }
  };

  return (
    <div className="home-container">
      <h1>Bienvenido a la Pokédex</h1>

      <PokemonSearch onSearch={handleSearch} />

      <div className="options-grid">
        <Link to="/pokemons" className="option-card">Pokémon</Link>
        <Link to="/berries" className="option-card">Bayas</Link>
        <Link to="/abilities" className="option-card">Habilidades</Link>
        <Link to="/regions" className="option-card">Regiones</Link>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Resultados de búsqueda ({searchType})</h2>
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;
