import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

export const COLORES_ESTADISTICAS = {
    hp: '#FF0000',       
    ataque: '#F08030',     
    defensa: '#F8D030',    
    'ataque-especial': '#6890F0',  
    'defensa-especial': '#78C850',  
    velocidad: '#F85888'  
  };
  

export const fetchPokemonDetails = async (pokemonName) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonName}/stats/`);
    return response.data;
};


export const fetchPokemonHabitat = async (pokemonId) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonId}/habitat/`);
    return response.data;
};


export const fetchEvolutionChain = async (pokemonId) => {
    const response = await axios.get(`${API_URL}/pokemons/${pokemonId}/evolution/`);
    return response.data;
};


export const fetchPokemonByType = async (type) => {
    const response = await axios.get(`${API_URL}/pokemons/type/${type}/`);
    return response.data.pokemon;
};


export const fetchPokemonByHabitat = async (habitat) => {
    const response = await axios.get(`${API_URL}/pokemons/habitat/${habitat}/`);
    return response.data.pokemon_species;};

    
export const obtenerCadenaEvolutiva = async (idEvolucion) => {
    try {
         const respuesta = await axios.get(`${API_URL}/evolution-chain/${idEvolucion}/`);
         return respuesta.data;
     } catch (error) {
         console.error("Error al obtener cadena evolutiva:", error);
         return null;
     }
  };