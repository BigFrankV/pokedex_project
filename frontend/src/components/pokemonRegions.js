import React from 'react';
import { Chip, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const RegionChip = styled(Chip)(({ theme, bgcolor }) => ({
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

export const REGIONES_POKEMON = [
    { nombre: 'kanto', color: '#FF5555', limite: 151 },
    { nombre: 'johto', color: '#55AA55', limite: 251 },
    { nombre: 'hoenn', color: '#5555FF', limite: 386 },
    { nombre: 'sinnoh', color: '#FF55FF', limite: 493 },
    { nombre: 'unova', color: '#FFAA55', limite: 649 },
    { nombre: 'kalos', color: '#55FFFF', limite: 721 },
    { nombre: 'alola', color: '#FFFF55', limite: 809 },
    { nombre: 'galar', color: '#AA55FF', limite: 898 }
];

export const RegionButtons = ({ regionSeleccionada, setRegionSeleccionada }) => {
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
                onClick={() => setRegionSeleccionada(null)}
                sx={{
                    borderRadius: '20px',
                    opacity: !regionSeleccionada ? 1 : 0.7
                }}
            >
                Todas las Regiones
            </Button>
            {REGIONES_POKEMON.map(region => (
                <RegionChip
                    key={region.nombre}
                    label={region.nombre.toUpperCase()}
                    bgcolor={region.color}
                    onClick={() => setRegionSeleccionada(region.nombre)}
                    className={regionSeleccionada === region.nombre ? 'active' : ''}
                    clickable
                />
            ))}
        </Box>
    );
};
