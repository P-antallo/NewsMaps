import React, { useState } from 'react';

function Buscador({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResult('Por favor, introduce un país o categoría válido');
      return;
    }

    const validCountries = ['ae','ar','at','au','be','bg','br','ca','ch','cn','co','cu','cz','de','eg','fr','gb','gr','hk','hu','id','ie','il','in','it','jp','kr','lt','lv','ma','mx','my','ng','nl','no','nz','ph','pl','pt','ro','rs','ru','sa','se','sg','sk','th','tr','tw','ua','us','ve','za'];
    const validCategories = ['business','entertainment','general','health','science','sports','technology'];

    if (!validCountries.includes(searchQuery.toLowerCase()) && !validCategories.includes(searchQuery.toLowerCase())) {
      setSearchResult('País o categoría no válidos');
      return;
    }

    setSearchResult('');
    onSearch(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar País/Categoría"
        />
        <button type="submit">Buscar</button>
      </form>
      {searchResult && <p>{searchResult}</p>}
    </div>
  );
}

export default Buscador;



