 
import React, { useState } from 'react';

const PokemonSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('pokemon'); // Opciones: pokemon, habilidad, baya

    const handleSearch = () => {
        onSearch(query.trim().toLowerCase(), filter);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Buscar Pokémon, habilidad o baya..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="pokemon">Pokémon</option>
                <option value="habilidad">Habilidad</option>
                <option value="baya">Baya</option>
            </select>
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default PokemonSearch;
