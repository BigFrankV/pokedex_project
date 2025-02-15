import React, { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokemonService';

const Pokedex = ({ onSelectPokemon }) => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons().then(setPokemons);
    }, []);

    return (
        <div>
            <h1>Pokédex</h1>
            <div className="pokedex-grid">
                {pokemons.map((pokemon, index) => (
                    <button key={index} onClick={() => onSelectPokemon(pokemon.name)}>
                        {pokemon.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pokedex;
