import { useState, useMemo } from 'preact/hooks';

interface Recipe {
  slug:        string;
  title:       string;
  country:     string;
  tags:        string[];
  photo?:      string;
  ingredients: string[];
}

interface Props {
  catalog: Recipe[];
  base:    string;
}

export default function SearchFilter({ catalog, base }: Props) {
  const [query,   setQuery]   = useState('');
  const [country, setCountry] = useState('');

  const countries = useMemo(
    () => Array.from(new Set(catalog.map(r => r.country))).sort(),
    [catalog],
  );

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return catalog.filter(r => {
      const matchesQuery = !q
        || r.title.toLowerCase().includes(q)
        || r.ingredients.some(i => i.toLowerCase().includes(q));
      const matchesCountry = !country || r.country === country;
      return matchesQuery && matchesCountry;
    });
  }, [catalog, query, country]);

  return (
    <div>
      <div class="controls">
        <input
          type="search"
          class="search-input"
          placeholder="Search recipes or ingredients…"
          value={query}
          onInput={e => setQuery((e.target as HTMLInputElement).value)}
        />
        <select
          class="country-select"
          value={country}
          onChange={e => setCountry((e.target as HTMLSelectElement).value)}
        >
          <option value="">All countries</option>
          {countries.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <p class="results-count">
        {results.length} {results.length === 1 ? 'recipe' : 'recipes'}
      </p>

      {results.length === 0 ? (
        <div class="empty-state">
          <p>No recipes found.</p>
        </div>
      ) : (
        <div class="recipe-grid">
          {results.map(r => (
            <a key={r.slug} href={`${base}recipes/${r.slug}/`} class="recipe-card">
              {r.photo
                ? <img src={`${base}photos/${r.photo}`} alt={r.title} loading="lazy" />
                : <div class="card-no-photo">🍳</div>
              }
              <div class="card-body">
                <h2>{r.title}</h2>
                <span class="card-country">{r.country}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
