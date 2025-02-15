// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PokemonList from "./pages/PokemonList";
import BerriesPage from "./pages/BerriesPage";
import AbilitiesPage from "./pages/AbilitiesPage";
import RegionsPage from "./pages/RegionsPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
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
  );
}

export default App;
