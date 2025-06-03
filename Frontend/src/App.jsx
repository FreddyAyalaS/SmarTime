// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader'; // Import the new header
import './App.css';

// Map sidebar item IDs to their corresponding titles
const pageTitles = {
    dashboard: 'Bienvenido a SmarTime',
    calendario: 'Calendario',
    tareas: 'Tareas',
    modo: 'Modo Antiprocrastinación',
    estadistica: 'Estadística',
    configuracion: 'Configuración',
};

function App() {
  const [activePageId, setActivePageId] = useState('dashboard'); // Default page is dashboard

  const handleNavItemClick = (pageId) => {
    setActivePageId(pageId);
  };

  const currentTitle = pageTitles[activePageId] || 'SmarTime'; // Fallback title

  return (
    <div className="app-container">
      <Sidebar
        activeItemId={activePageId} // Pass the current active ID to Sidebar
        onNavItemClick={handleNavItemClick} // Pass the handler to update active ID
      />
      <div className="main-layout"> {/* Wrapper for TopHeader and main content */}
        <TopHeader title={currentTitle} />
        <main className="main-content">
          {/* Your main page content will go here */}
          {/* This content could also change based on activePageId */}
          <h2>Page: {currentTitle}</h2>
          <p>Content for the selected page will appear here.</p>
        </main>
      </div>
    </div>
  );
}

export default App;