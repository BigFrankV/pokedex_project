import React from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Typography, 
    IconButton,
    Divider
} from '@mui/material';
import { 
    GitHub, 
    LinkedIn, 
    Code, 
    CatchingPokemon 
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
    return (
        <Box className="footer-container">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box className="footer-section">
                            <CatchingPokemon sx={{ fontSize: 40 }} />
                            <Typography variant="h6" gutterBottom>
                                PokéDex App
                            </Typography>
                            <Typography variant="body2">
                                Explora el mundo Pokémon con nuestra aplicación
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                Tecnologías
                            </Typography>
                            <Typography variant="body2">React</Typography>
                            <Typography variant="body2">Django</Typography>
                            <Typography variant="body2">Material-UI</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                Síguenos Frank Vogt
                            </Typography>
                            <Box className="social-icons">
                                <IconButton color="inherit" href="https://github.com" target="_blank">
                                    <GitHub />
                                </IconButton>
                                <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                                    <LinkedIn />
                                </IconButton>
                                <IconButton color="inherit" href="https://pokeapi.co" target="_blank">
                                    <Code />
                                </IconButton>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                <Box className="footer-bottom">
                    <Typography variant="body2" align="center">
                        © 2025 PokéDex. Powered by PokeAPI
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
