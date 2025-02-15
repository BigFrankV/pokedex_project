import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

export const getPokemons = async () => {
    const response = await axios.get(`${API_URL}pokemons/`);
    return response.data.results;
};

export const getPokemonDetails = async (pokemonName) => {
    const response = await axios.get(`${API_URL}pokemons/${pokemonName}/`);
    return response.data;
};
