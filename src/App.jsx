import React, { useState } from 'react';
import './App.css';
import MiApi from './assets/MiApi';
import Mapa from './assets/Mapa';
import Buscador from './assets/Buscador';

function App() {
  const [searchParams, setSearchParams] = useState({
    country: '',
    category: '',
    query: '',
  });

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>News/Maps</h1>
        <div className="search-section">
          <MiApi onSearch={handleSearch} />
        </div>
        <div className="map-container">
          <Mapa countries={['us', 'fr', 'de']} />
        </div>
        <div className="search-section">
          <Buscador onSearch={handleSearch} />
        </div>
      </div>
      <div className="right-panel">
        <MiApi searchParams={searchParams} />
      </div>
    </div>
  );
}

export default App;
