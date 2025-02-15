import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";
import PokemonModal from "../components/PokemonModal"; // ✅ Importación correcta

const API_URL = "http://127.0.0.1:8000/api/pokemons/";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pokemons.length === 0) {
      loadPokemons(0, true);
    }
  }, [pokemons.length]);

  const loadPokemons = async (currentOffset, reset = false) => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.get(`${API_URL}?limit=20&offset=${currentOffset}`);
        
        if (res.data.results && Array.isArray(res.data.results)) {
            const pokemonsWithDetails = await Promise.all(
                res.data.results.map(async (poke) => {
                    const detailRes = await axios.get(poke.url);
                    return {
                        ...poke,
                        types: detailRes.data.types,
                        id: detailRes.data.id,
                        image_url: detailRes.data.sprites.front_default
                    };
                })
            );
            
            setPokemons(prev => reset ? pokemonsWithDetails : [...prev, ...pokemonsWithDetails]);
            setOffset(prevOffset => prevOffset + 20);
        }
    } catch (err) {
        setError("No se pudieron cargar los Pokémon. Verifica la API.");
    }
    setLoading(false);
};


  // 🔥 Nueva función para obtener los detalles completos de un Pokémon al hacer clic
  const fetchPokemonDetails = async (pokemon) => {
    try {
      const res = await axios.get(pokemon.url); // 🔥 URL de la API del Pokémon
      setSelectedPokemon(res.data); // ✅ Guarda todos los detalles del Pokémon
    } catch (err) {
      console.error("Error al obtener detalles del Pokémon:", err);
    }
  };

  // 🔎 Filtrado en tiempo real (por nombre)
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [searchTerm, pokemons]);

  return (
    <div className="pokemon-container">
      <h1>Lista de Pokémon</h1>

      {/* 🔎 Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {error && <p className="error-message">{error}</p>}


      <div className="pokemon-grid">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((poke, index) => (
            <div key={index} className={`pokemon-card ${poke.types && poke.types[0] ? poke.types[0].type.name : ''}`}  onClick={() => fetchPokemonDetails(poke)}>
              <img
                src={poke.image_url}
                alt={poke.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <h3>{poke.name}</h3>
            </div>
          ))
        ) : loading ? (
          <p>Cargando Pokémon...</p>
        ) : (
          <p>No hay Pokémon disponibles.</p>
        )}
      </div>

      {!loading && (
        <button className="load-more" onClick={() => loadPokemons(offset)}>
          Mostrar más
        </button>
      )}

      {/* 🟢 Modal de detalles cuando se selecciona un Pokémon */}
      {selectedPokemon && <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
    </div>
  );
};

export default PokemonList;
