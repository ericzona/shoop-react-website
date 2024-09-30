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
      <Layout> {/* Layout already contains Navbar and Ticker */}
        <div className="flex justify-center items-center min-h-screen bg-black">
          <div className="w-4/5 lg:w-3/5 bg-black border-4 border-neonRed p-4 rounded-lg shadow-lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dapp" element={<DApp />} />
              <Route path="/dashboard" element={<ShoopDashboard />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
