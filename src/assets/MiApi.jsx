import React, { useState, useEffect } from 'react';

function MiApi({ onSearch, searchParams }) {
  const [articles, setArticles] = useState([]);
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');

  const countries = [
    { code: 'ae', name: 'Emiratos Árabes Unidos' },
    { code: 'ar', name: 'Argentina' },
    { code: 'at', name: 'Austria' },
    { code: 'au', name: 'Australia' },
    { code: 'be', name: 'Bélgica' },
    { code: 'bg', name: 'Bulgaria' },
    { code: 'br', name: 'Brasil' },
    { code: 'ca', name: 'Canadá' },
    { code: 'ch', name: 'Suiza' },
    { code: 'cn', name: 'China' },
    { code: 'co', name: 'Colombia' },
    { code: 'cu', name: 'Cuba' },
    { code: 'cz', name: 'República Checa' },
    { code: 'de', name: 'Alemania' },
    { code: 'eg', name: 'Egipto' },
    { code: 'fr', name: 'Francia' },
    { code: 'gb', name: 'Reino Unido' },
    { code: 'gr', name: 'Grecia' },
    { code: 'hk', name: 'Hong Kong' },
    { code: 'hu', name: 'Hungría' },
    { code: 'id', name: 'Indonesia' },
    { code: 'ie', name: 'Irlanda' },
    { code: 'il', name: 'Israel' },
    { code: 'in', name: 'India' },
    { code: 'it', name: 'Italia' },
    { code: 'jp', name: 'Japón' },
    { code: 'kr', name: 'Corea del Sur' },
    { code: 'lt', name: 'Lituania' },
    { code: 'lv', name: 'Letonia' },
    { code: 'ma', name: 'Marruecos' },
    { code: 'mx', name: 'México' },
    { code: 'my', name: 'Malasia' },
    { code: 'ng', name: 'Nigeria' },
    { code: 'nl', name: 'Países Bajos' },
    { code: 'no', name: 'Noruega' },
    { code: 'nz', name: 'Nueva Zelanda' },
    { code: 'ph', name: 'Filipinas' },
    { code: 'pl', name: 'Polonia' },
    { code: 'pt', name: 'Portugal' },
    { code: 'ro', name: 'Rumania' },
    { code: 'rs', name: 'Serbia' },
    { code: 'ru', name: 'Rusia' },
    { code: 'sa', name: 'Arabia Saudita' },
    { code: 'se', name: 'Suecia' },
    { code: 'sg', name: 'Singapur' },
    { code: 'sk', name: 'Eslovaquia' },
    { code: 'th', name: 'Tailandia' },
    { code: 'tr', name: 'Turquía' },
    { code: 'tw', name: 'Taiwán' },
    { code: 'ua', name: 'Ucrania' },
    { code: 'us', name: 'Estados Unidos' },
    { code: 've', name: 'Venezuela' },
    { code: 'za', name: 'Sudáfrica' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const categories = [
    { code: 'business', name: 'Negocios' },
    { code: 'entertainment', name: 'Entretenimiento' },
    { code: 'general', name: 'General' },
    {    code: 'health', name: 'Salud' },
    { code: 'science', name: 'Ciencia' },
    { code: 'sports', name: 'Deportes' },
    { code: 'technology', name: 'Tecnología' },
  ].sort((a, b) => a.name.localeCompare(b.name));

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
    setArticles([]); 
    if (onSearch) {
      onSearch({ country: '', category: '', query: '' }); 
    }
  };

  if (onSearch) {
    return (
      <form onSubmit={handleSubmit}>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Todos los países</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        <button type="submit">Buscar</button>
        <button type="button" onClick={handleReset}>Reiniciar</button>
      </form>
    );
  } else {
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

