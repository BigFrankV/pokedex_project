
import React from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
      <h3 className="pokemon-name">{pokemon.name.toUpperCase()}</h3>
      <div className="pokemon-info">
        <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Habilidad:</strong> {pokemon.abilities[0].ability.name}</p>
        <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
      </div>
    </div>
  );
};

export default PokemonCard;
