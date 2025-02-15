import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegionsPage.css';

const Regions = () => {
  const [regiones, setRegiones] = useState([]);
  const [cargando, setCargando] = useState(true);

  const imagenRegiones = {
    kanto: "https://archives.bulbagarden.net/media/upload/2/25/LGPE_Kanto_Map.png",
    johto: "https://archives.bulbagarden.net/media/upload/6/64/JohtoMap.png",
    hoenn: "https://archives.bulbagarden.net/media/upload/8/85/Hoenn_ORAS.png",
    sinnoh: "https://archives.bulbagarden.net/media/upload/0/08/Sinnoh_BDSP_artwork.png",
    unova: "https://archives.bulbagarden.net/media/upload/f/fc/Unova_B2W2_map.png",
    kalos: "https://archives.bulbagarden.net/media/upload/8/8a/Kalos_alt.png",
    alola: "https://archives.bulbagarden.net/media/upload/0/0b/Alola_USUM_artwork.png",
    galar: "https://archives.bulbagarden.net/media/upload/c/ce/Galar_artwork.png"
  };

  useEffect(() => {
    const obtenerRegiones = async () => {
      try {
        const respuesta = await axios.get('https://pokeapi.co/api/v2/region');
        const resultados = respuesta.data.results;
        
        const detallesRegiones = await Promise.all(
          resultados.map(async (region) => {
            const detalle = await axios.get(region.url);
            return detalle.data;
          })
        );
        
        setRegiones(detallesRegiones);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar regiones:', error);
        setCargando(false);
      }
    };

    obtenerRegiones();
  }, []);

  if (cargando) {
    return <div className="cargando">Cargando Regiones...</div>;
  }

  return (
    <div className="contenedor-regiones">
      <h1>Regiones Pokémon</h1>
      <div className="grid-regiones">
        {regiones.map((region) => (
          <div key={region.id} className="tarjeta-region">
            <div className="imagen-region">
              <img 
                src={imagenRegiones[region.name] || 'https://via.placeholder.com/300x200?text=Región+Pokémon'}
                alt={region.name}
              />
            </div>
            <div className="info-region">
              <h3>{region.names?.find(name => name?.language?.name === "es")?.name || region.name}</h3>
              <div className="detalles-region">
                <p>Localizaciones: {region.locations?.length || 0}</p>
                <p>Generación: {region.main_generation?.name?.split('-')[1]?.toUpperCase() || 'N/A'}</p>
                <p>Versiones de juego:</p>
                <ul>
                  {(region.version_groups || []).map((version, index) => (
                    <li key={index}>{version?.name?.replace(/-/g, ' ').toUpperCase() || 'N/A'}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regions;
