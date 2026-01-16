import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { store, dispatch } = useGlobalReducer();
  const [results, setResults] = useState({ characters: [], episodes: [], locations: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchEndpoint = async (url) => {
          const pages = [1, 2, 3];
          const promises = pages.map(page => 
            fetch(`${url}?page=${page}`)
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
          );
          
          const responses = await Promise.all(promises);
          return responses.reduce((acc, data) => {
            if (data && data.results) {
              return [...acc, ...data.results];
            }
            return acc;
          }, []);
        };

        const [chars, eps, locs] = await Promise.all([
          fetchEndpoint('https://thesimpsonsapi.com/api/characters'),
          fetchEndpoint('https://thesimpsonsapi.com/api/episodes'),
          fetchEndpoint('https://thesimpsonsapi.com/api/locations')
        ]);

        const lowerQuery = query.toLowerCase();
        const filter = (arr) => arr.filter(item => item.name && item.name.toLowerCase().includes(lowerQuery));

        setResults({
          characters: filter(chars),
          episodes: filter(eps),
          locations: filter(locs)
        });
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const checkFavorite = (id, type) => {
    return store.favorites.some(fav => fav.id === id && fav.type === type);
  };

  const handleToggleFavorite = (item, type) => {
    const isFav = checkFavorite(item.id, type);
    if (isFav) {
      dispatch({ type: "remove_favorite", payload: { ...item, type } });
    } else {
      dispatch({ type: "add_favorite", payload: { ...item, type } });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{ fontFamily: "'Creepster', cursive", color: "#FFD90F", textShadow: "2px 2px 0 #000", fontSize: "3rem" }}>
        Search Results for "{query}"
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-warning" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {results.characters.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #FFD90F", display: "inline-block", paddingRight: "20px" }}>Characters</h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {results.characters.map(char => (
                  <div className="col" key={char.id}>
                    <Card 
                      item={char} 
                      isFavorite={checkFavorite(char.id, 'character')}
                      onAddFavorite={(item) => handleToggleFavorite(item, 'character')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.episodes.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #87CEEB", display: "inline-block", paddingRight: "20px" }}>Episodes</h3>
              <div className="list-group">
                {results.episodes.map(ep => (
                  <div key={ep.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ border: "2px solid #000", marginBottom: "10px", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
                    <div>
                      <h5 className="mb-1 fw-bold">{ep.name}</h5>
                      <p className="mb-0 text-muted">Season {ep.season}, Episode {ep.episode}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Link to={`/episode/${ep.id}`} className="btn btn-sm" style={{ backgroundColor: "#87CEEB", border: "2px solid #000", fontWeight: "bold" }}>View</Link>
                      <button 
                        className="btn btn-sm"
                        onClick={() => handleToggleFavorite(ep, 'episode')}
                        style={{ fontSize: "1.5rem", border: "none", background: "transparent" }}
                      >
                        {checkFavorite(ep.id, 'episode') ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.locations.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #FF6B35", display: "inline-block", paddingRight: "20px" }}>Locations</h3>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {results.locations.map(loc => (
                  <div className="col" key={loc.id}>
                    <div className="card h-100" style={{ border: "3px solid #000", borderRadius: "10px" }}>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{loc.name}</h5>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <Link to={`/location/${loc.id}`} className="btn btn-sm" style={{ backgroundColor: "#FFD90F", border: "2px solid #000", fontWeight: "bold" }}>Details</Link>
                          <button 
                            className="btn btn-sm"
                            onClick={() => handleToggleFavorite(loc, 'location')}
                            style={{ fontSize: "1.5rem", border: "none", background: "transparent" }}
                          >
                            {checkFavorite(loc.id, 'location') ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.characters.length === 0 && results.episodes.length === 0 && results.locations.length === 0 && (
            <div className="text-center py-5">
              <h3>D'oh! No results found.</h3>
              <p>Try searching for "Homer", "Springfield", or "Treehouse".</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};