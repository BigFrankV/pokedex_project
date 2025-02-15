import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PokemonList from "./pages/PokemonList";
import BerriesPage from "./pages/BerriesPage";
import AbilitiesPage from "./pages/AbilitiesPage";
import RegionsPage from "./pages/RegionsPage";
import './App.css';
import './components/theme.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container" style={{
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          minHeight: '100vh'
        }}>
          <Navbar />
          <ThemeToggle />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemons" element={<PokemonList />} />
              <Route path="/berries" element={<BerriesPage />} />
              <Route path="/abilities" element={<AbilitiesPage />} />
              <Route path="/regions" element={<RegionsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
