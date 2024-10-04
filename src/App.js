import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DApp from './pages/DApp';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ShoopDashboard from './components/ShoopDashboard';
import Layout from './components/Layout'; // Import Layout

function App() {
  return (
    <Router>
      <Routes>
        {/* Instead of passing Layout as a wrapper, we use it directly in each route */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/dapp" element={<Layout><DApp /></Layout>} />
        <Route path="/dashboard" element={<Layout><ShoopDashboard /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
