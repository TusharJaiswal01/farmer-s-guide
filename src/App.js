// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SoilTypes from './components/SoilTypes';
import Fertilizers from './components/Fertilizers';
// import CropSuggestions from './components/CropSuggestions';
import SoilTesting from './components/SoilTesting';
import Header from './components/Header';
import Footer from './components/Footer';
import HybridSeed from './components/HybridSeed';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/soil-types" element={<SoilTypes />} />
        <Route path="/fertilizers" element={<Fertilizers />} />
        {/* <Route path="/crop-suggestions" element={<CropSuggestions />} /> */}
        <Route path="/HybridSeed" element={<HybridSeed />} />
        <Route path="/soil-testing" element={<SoilTesting />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
