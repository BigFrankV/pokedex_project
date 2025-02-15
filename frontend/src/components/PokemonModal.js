import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, LinearProgress, Typography, styled } from '@mui/material';
import "./PokemonModal.css";

const StyledProgress = styled(LinearProgress)(({ value }) => ({
    height: 10,
    borderRadius: 5,
    [`&.MuiLinearProgress-colorPrimary`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    [`& .MuiLinearProgress-bar`]: {
        borderRadius: 5,
        backgroundColor: value < 50 ? '#ff6b6b' : value < 80 ? '#ffd93d' : '#4caf50',
        transition: 'transform 1s ease-in-out',
    },
}));

const StatBar = ({ name, value }) => (
    <Box sx={{ my: 1.5, width: '100%' }}>
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 1,
            alignItems: 'center' 
        }}>
            <Typography 
                variant="body1" 
                sx={{ 
                    textTransform: 'capitalize',
                    fontWeight: 500
                }}
            >
                {name}
            </Typography>
            <Typography 
                variant="body1" 
                fontWeight="bold"
                sx={{ minWidth: '45px', textAlign: 'right' }}
            >
                {value}
            </Typography>
        </Box>
        <StyledProgress
      
        variant="determinate"
        value={(value / 255) * 100}/>

    </Box>
);

const PokemonModal = ({ pokemon, onClose }) => {
    const [habitat, setHabitat] = useState(null);
    const [evoluciones, setEvoluciones] = useState(null);

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
    }, [pokemon.name]);

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
                                {pokemon.stats.map((stat, index) => (
                                    <StatBar
                                        key={index}
                                        name={stat.stat.name}
                                        value={stat.base_stat}
                                    />
                                ))}
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
                                <h3>Hábitat</h3>
                                <div className="habitat-info">
                                    {habitat && habitat.pokemon_species && (
                                        habitat.pokemon_species.map((species, index) => (
                                            <span key={index} className="habitat-badge">
                                                {species.name}
                                            </span>
                                        ))
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
