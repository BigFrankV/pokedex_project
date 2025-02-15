import React, { useEffect, useState } from 'react';
import { getPokemonDetails } from '../services/pokemonService';

const PokemonDetails = ({ pokemonName }) => {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        if (pokemonName) {
            getPokemonDetails(pokemonName).then(setPokemon);
        }
    }, [pokemonName]);

    if (!pokemon) return <div>Selecciona un Pokémon</div>;

    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Altura: {pokemon.height}</p>
            <p>Habilidades: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
    );
};

export default PokemonDetails;
