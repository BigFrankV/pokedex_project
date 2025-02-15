import React, { useState } from 'react';
import { useTheme } from '../components/ThemeContext';

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Container,
    Menu,
    MenuItem,
    Button
} from '@mui/material';
import {
    CatchingPokemon,
    Menu as MenuIcon,
    Grass,
    Psychology,
    Public,
    Home,
    DarkMode,
    LightMode
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { theme, toggleTheme } = useTheme();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar 
            position="static" 
            className="navbar-custom"
            sx={{
                backgroundColor: 'var(--card-background)',
                color: 'var(--text-color)'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CatchingPokemon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={RouterLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        POKÉDEX
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component={RouterLink} to="/">Inicio</MenuItem>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/pokemons">Pokémon</MenuItem>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/berries">Bayas</MenuItem>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/abilities">Habilidades</MenuItem>
                            <MenuItem onClick={handleClose} component={RouterLink} to="/regions">Regiones</MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component={RouterLink}
                            to="/"
                            startIcon={<Home />}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Inicio
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/pokemons"
                            startIcon={<CatchingPokemon />}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Pokémon
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/berries"
                            startIcon={<Grass />}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Bayas
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/abilities"
                            startIcon={<Psychology />}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Habilidades
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/regions"
                            startIcon={<Public />}
                            sx={{ my: 2, color: 'inherit', display: 'block' }}
                        >
                            Regiones
                        </Button>
                    </Box>

                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme === 'light' ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
