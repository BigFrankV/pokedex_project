import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

// Obtener detalles de un Pokémon
export const fetchPokemonDetails = async (pokemonName) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonName}/stats/`);
    return response.data;
};

// Obtener información del hábitat
export const fetchPokemonHabitat = async (pokemonId) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonId}/habitat/`);
    return response.data;
};

// Obtener cadena de evolución
export const fetchEvolutionChain = async (pokemonId) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonId}/evolution/`);
    return response.data;
};

// Obtener Pokémon por tipo
export const fetchPokemonByType = async (type) => {
    const response = await axios.get(`${API_URL}/pokemons/type/${type}/`);
    return response.data.pokemon;
};

// Obtener Pokémon por hábitat
export const fetchPokemonByHabitat = async (habitat) => {
    const response = await axios.get(`${API_URL}/pokemons/habitat/${habitat}/`);
    return response.data.pokemon_species;
};
vamos