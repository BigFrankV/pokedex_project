import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, LinearProgress, Typography } from '@mui/material';
import "./PokemonModal.css";
import { COLORES_ESTADISTICAS } from '../services/pokemonApi';

const PokemonModal = ({ pokemon, onClose }) => {
    const [setHabitat] = useState(null);
    const [evoluciones, setEvoluciones] = useState(null);
    const [pokemonsByHabitat, setPokemonsByHabitat] = useState([]);

    useEffect(() => {
        const fetchHabitat = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/pokemon-habitat/${pokemon.name}`);
                setHabitat(response.data);
            } catch (error) {
                console.log('Error al cargar hábitat:', error);
            }
        };
    
        fetchHabitat();
    }, [pokemon.name, setHabitat]);

    useEffect(() => {
        const fetchEvoluciones = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/evolution-chain/${pokemon.id}`);
                setEvoluciones(response.data);
            } catch (error) {
                console.log('Error al cargar evoluciones:', error);
            }
        };
        fetchEvoluciones();
    }, [pokemon.id]);

    useEffect(() => {
    const fetchPokemonsByHabitat = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/pokemon-by-habitat/${pokemon.id}`);
            setPokemonsByHabitat(response.data);
        } catch (error) {
            console.log('Error al cargar pokémon del mismo hábitat:', error);
        }
    };
    
    if (pokemon.id) {
        fetchPokemonsByHabitat();
    }
}, [pokemon.id, setPokemonsByHabitat]);
    
    

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>

                <div className="modal-header">
                    <span className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</span>
                    <h2 className="pokemon-name">{pokemon.name}</h2>
                    <div className="pokemon-types">
                        {pokemon.types.map((type, index) => (
                            <span key={index} className={`type-badge ${type.type.name}`}>
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="modal-body">
                    <div className="pokemon-image-section">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                            alt={pokemon.name}
                            className="pokemon-image"
                        />

                        <div className="pokemon-variants">
                            {pokemon.sprites.front_shiny && (
                                <div className="variant-item">
                                    <h4>Shiny</h4>
                                    <img
                                        src={pokemon.sprites.front_shiny}
                                        alt={`${pokemon.name} shiny`}
                                    />
                                </div>
                            )}

                            {pokemon.sprites.back_default && (
                                <div className="variant-item">
                                    <h4>Vista Trasera</h4>
                                    <img
                                        src={pokemon.sprites.back_default}
                                        alt={`${pokemon.name} back`}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="evolution-chain">
                            {evoluciones && evoluciones.chain && (
                                <>
                                    <div className="evolution-item">
                                        <img
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoluciones.chain.species.url.split('/').slice(-2)[0]}.png`}
                                            alt={evoluciones.chain.species.name}
                                        />
                                        <span>{evoluciones.chain.species.name}</span>
                                    </div>
                                    {evoluciones.chain.evolves_to.map((evo, index) => (
                                        <div key={index} className="evolution-group">
                                            <span className="evolution-arrow">→</span>
                                            <div className="evolution-item">
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.split('/').slice(-2)[0]}.png`}
                                                    alt={evo.species.name}
                                                />
                                                <span>{evo.species.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="pokemon-info-section">
                        <div className="stats-section">
                            <h3>Estadísticas Base</h3>
                            <Box sx={{ width: '100%', p: 2 }}>
                                {pokemon.stats.map((stat, index) => {
                                    const nombreEstadistica = {
                                        'hp': 'hp',
                                        'attack': 'ataque',
                                        'defense': 'defensa',
                                        'special-attack': 'ataque-especial',
                                        'special-defense': 'defensa-especial',
                                        'speed': 'velocidad'
                                    }[stat.stat.name];

                                    return (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ mb: 1 }}>
                                                {nombreEstadistica.toUpperCase()}: {stat.base_stat}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={(stat.base_stat / 255) * 100}
                                                sx={{
                                                    height: 10,
                                                    borderRadius: 5,
                                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: COLORES_ESTADISTICAS[nombreEstadistica],
                                                        borderRadius: 5
                                                    }
                                                }}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </div>

                        <div className="details-section">
                            <div className="detail-item">
                                <h3>Características</h3>
                                <p>Altura: {pokemon.height / 10} m</p>
                                <p>Peso: {pokemon.weight / 10} kg</p>
                                <p>Experiencia Base: {pokemon.base_experience}</p>
                            </div>

                            <div className="detail-item">
                                <h3>Habilidades</h3>
                                <div className="abilities-list">
                                    {pokemon.abilities.map((ability, index) => (
                                        <span key={index} className="ability-badge">
                                            {ability.ability.name}
                                            {ability.is_hidden && ' (Oculta)'}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-item">
                                <h3>Movimientos Destacados</h3>
                                <div className="moves-list">
                                    {pokemon.moves.slice(0, 4).map((move, index) => (
                                        <span key={index} className="move-badge">
                                            {move.move.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-item">
                                <h3>Pokémon del mismo hábitat</h3>
                                <div className="habitat-pokemon-list">
                                    {pokemonsByHabitat.length > 0 ? (
                                        pokemonsByHabitat.slice(0, 5).map((pokemon, index) => (
                                            <div key={index} className="habitat-pokemon-item">
                                                <img 
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                                    alt={pokemon.name}
                                                />
                                                <span>{pokemon.name}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay información de otros Pokémon en este hábitat</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
