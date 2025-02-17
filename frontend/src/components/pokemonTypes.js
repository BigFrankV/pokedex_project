import React from 'react';
import { Chip, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const TypeChip = styled(Chip)(({ theme, bgcolor }) => ({
    margin: theme.spacing(0.5),
    color: 'white',
    backgroundColor: bgcolor,
    '&:hover': {
        backgroundColor: bgcolor,
        opacity: 0.9,
        transform: 'scale(1.05)',
    },
    '&.active': {
        border: '2px solid white',
        boxShadow: `0 0 5px ${bgcolor}`,
    },
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease',
}));

const TIPOS_POKEMON = [
    { nombre: 'normal', color: '#A8A878' },
    { nombre: 'fire', color: '#F08030' },
    { nombre: 'water', color: '#6890F0' },
    { nombre: 'grass', color: '#78C850' },
    { nombre: 'electric', color: '#F8D030' },
    { nombre: 'ice', color: '#98D8D8' },
    { nombre: 'fighting', color: '#C03028' },
    { nombre: 'poison', color: '#A040A0' },
    { nombre: 'ground', color: '#E0C068' },
    { nombre: 'flying', color: '#A890F0' },
    { nombre: 'psychic', color: '#F85888' },
    { nombre: 'bug', color: '#A8B820' },
    { nombre: 'rock', color: '#B8A038' },
    { nombre: 'ghost', color: '#705898' },
    { nombre: 'dragon', color: '#7038F8' },
    { nombre: 'dark', color: '#705848' },
    { nombre: 'steel', color: '#B8B8D0' },
    { nombre: 'fairy', color: '#EE99AC' }
];

export const FilterButtons = ({ tipoSeleccionado, setTipoSeleccionado }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            p: 2, 
            borderRadius: 2,
            backgroundColor: 'rgba(255,255,255,0.1)' 
        }}>
            <Button 
                variant="contained"
                color="primary"
                onClick={() => setTipoSeleccionado(null)}
                sx={{
                    borderRadius: '20px',
                    opacity: !tipoSeleccionado ? 1 : 0.7
                }}
            >
                Todos los Tipos
            </Button>
            {TIPOS_POKEMON.map(tipo => (
                <TypeChip
                    key={tipo.nombre}
                    label={tipo.nombre}
                    bgcolor={tipo.color}
                    onClick={() => setTipoSeleccionado(tipo.nombre)}
                    className={tipoSeleccionado === tipo.nombre ? 'active' : ''}
                    clickable
                />
            ))}
        </Box>
    );
};
