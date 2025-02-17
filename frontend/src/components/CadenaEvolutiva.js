const CadenaEvolutiva = ({ cadenaEvolutiva }) => {
    return (
        <div className="cadena-evolutiva">
            {cadenaEvolutiva.map((pokemon, indice) => (
                <div key={indice} className="etapa-evolucion">
                    <img 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.nombre}
                    />
                    <p>{pokemon.nombre}</p>
                    {pokemon.nivel_minimo && <p>Nivel {pokemon.nivel_minimo}</p>}
                    {indice < cadenaEvolutiva.length - 1 && <span>→</span>}
                </div>
            ))}
        </div>
    );
};
