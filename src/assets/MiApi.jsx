import React, { useState, useEffect } from 'react';

function MiApi({ onSearch, searchParams }) {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (onSearch || !searchParams || (!searchParams.country && !searchParams.category && !searchParams.query)) return;

    const apiKey = 'd891238769a5433bbedadc6bd44024ca';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${searchParams.country}&category=${searchParams.category}&q=${searchParams.query}&apiKey=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles.slice(0, 10));
        }
      })
      .catch(error => console.error('Error:', error));
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ country, category, query });
    }
  };

  const handleReset = () => {
    setCountry('');
    setCategory('');
    setQuery('');
    setArticles([]); // Limpiar los resultados de la búsqueda
    if (onSearch) {
      onSearch({ country: '', category: '', query: '' }); // Restablecer los resultados de la búsqueda
    }
  };

  if (onSearch) {
    // Render search form
    
    return(
      <form onSubmit={handleSubmit}>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Todos los países</option>
          <option value="ae">Emiratos Árabes Unidos</option>
          <option value="ar">Argentina</option>
          <option value="at">Austria</option>
          <option value="au">Australia</option>
          <option value="be">Bélgica</option>
          <option value="bg">Bulgaria</option>
          <option value="br">Brasil</option>
          <option value="ca">Canadá</option>
          <option value="ch">Suiza</option>
          <option value="cn">China</option>
          <option value="co">Colombia</option>
          <option value="cu">Cuba</option>
          <option value="cz">República Checa</option>
          <option value="de">Alemania</option>
          <option value="eg">Egipto</option>
          <option value="fr">Francia</option>
          <option value="gb">Reino Unido</option>
          <option value="gr">Grecia</option>
          <option value="hk">Hong Kong</option>
          <option value="hu">Hungría</option>
          <option value="id">Indonesia</option>
          <option value="ie">Irlanda</option>
          <option value="il">Israel</option>
          <option value="in">India</option>
          <option value="it">Italia</option>
          <option value="jp">Japón</option>
          <option value="kr">Corea del Sur</option>
          <option value="lt">Lituania</option>
          <option value="lv">Letonia</option>
          <option value="ma">Marruecos</option>
          <option value="mx">México</option>
          <option value="my">Malasia</option>
          <option value="ng">Nigeria</option>
          <option value="nl">Países Bajos</option>
          <option value="no">Noruega</option>
          <option value="nz">Nueva Zelanda</option>
          <option value="ph">Filipinas</option>
          <option value="pl">Polonia</option>
          <option value="pt">Portugal</option>
          <option value="ro">Rumania</option>
          <option value="rs">Serbia</option>
          <option value="ru">Rusia</option>
          <option value="sa">Arabia Saudita</option>
          <option value="se">Suecia</option>
          <option value="sg">Singapur</option>
          <option value="si">Eslovenia</option>
          <option value="sk">Eslovaquia</option>
          <option value="th">Tailandia</option>
          <option value="tr">Turquía</option>
          <option value="tw">Taiwán</option>
          <option value="ua">Ucrania</option>
          <option value="us">Estados Unidos</option>
          <option value="ve">Venezuela</option>
          <option value="za">Sudáfrica</option>
        </select>
        <select value={category}
        onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="business">Negocios</option>
        <option value="entertainment">Entretenimiento</option>
        <option value="general">General</option>
        <option value="health">Salud</option>
        <option value="science">Ciencia</option>
        <option value="sports">Deportes</option>
        <option value="technology">Tecnología</option>
      </select>
      <button type="submit">Buscar</button>
        <button type="button" onClick={handleReset}>Reiniciar</button>
      </form>
    );
  } else {
  // Render articles
  return (
    <div className="articles">
      {articles.map((article, index) => (
        <div key={index} className="article">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
        </div>
      ))}
    </div>
  );
}
}

export default MiApi;