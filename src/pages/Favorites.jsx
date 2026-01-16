import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const { store, dispatch } = useGlobalReducer();
  const { favorites } = store;

  const characters = favorites.filter(f => f.type === 'character');
  const episodes = favorites.filter(f => f.type === 'episode');
  const locations = favorites.filter(f => f.type === 'location');

  const handleRemove = (item) => {
    dispatch({ type: "remove_favorite", payload: item });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5" style={{
        fontFamily: "'Creepster', cursive",
        color: "#FFD90F",
        textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
        fontSize: "3rem"
      }}>
        Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center">
          <h3>No favorites yet!</h3>
          <p>Go explore Springfield and add some items to your list.</p>
          <Link to="/" className="btn btn-lg mt-3" style={{
            backgroundColor: "#FFD90F",
            color: "#000",
            border: "3px solid #000",
            fontWeight: "bold"
          }}>
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          {characters.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #FFD90F", display: "inline-block", paddingRight: "20px" }}>Characters</h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {characters.map(char => (
                  <div className="col" key={char.id}>
                    <Card
                      item={char}
                      isFavorite={true}
                      onAddFavorite={() => handleRemove(char)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {episodes.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #87CEEB", display: "inline-block", paddingRight: "20px" }}>Episodes</h3>
              <div className="list-group">
                {episodes.map(ep => (
                  <div key={ep.id} className="list-group-item d-flex justify-content-between align-items-center" style={{ border: "2px solid #000", marginBottom: "10px", borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
                    <div>
                      <h5 className="mb-1 fw-bold">{ep.name}</h5>
                      <p className="mb-0 text-muted">Season {ep.season}, Episode {ep.episode_number || ep.episode}</p>
                    </div>
                    <div className="d-flex gap-2">
                      <Link to={`/episode/${ep.id}`} className="btn btn-sm" style={{ backgroundColor: "#87CEEB", border: "2px solid #000", fontWeight: "bold" }}>View</Link>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleRemove(ep)}
                        style={{ fontSize: "1.5rem", border: "none", background: "transparent" }}
                        title="Remove from favorites"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {locations.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3" style={{ borderBottom: "4px solid #FF6B35", display: "inline-block", paddingRight: "20px" }}>Locations</h3>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {locations.map(loc => (
                  <div className="col" key={loc.id}>
                    <div className="card h-100" style={{ border: "3px solid #000", borderRadius: "10px" }}>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">{loc.name}</h5>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <Link to={`/location/${loc.id}`} className="btn btn-sm" style={{ backgroundColor: "#FFD90F", border: "2px solid #000", fontWeight: "bold" }}>Details</Link>
                          <button
                            className="btn btn-sm"
                            onClick={() => handleRemove(loc)}
                            style={{ fontSize: "1.5rem", border: "none", background: "transparent" }}
                            title="Remove from favorites"
                          >
                            ❤️
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};