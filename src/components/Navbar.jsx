import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { GinoPopup } from "./GinoPopup";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showGino, setShowGino] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleRemoveFavorite = (item) => {
    dispatch({ type: "remove_favorite", payload: item });
    if (item.name === "Bart Simpson") {
      setShowGino(true);
    }
  };

  const handleCloseGino = useCallback(() => {
    setShowGino(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
    dispatch({ type: "set_search_query", payload: "" });
  };

  const handleResultClick = (item) => {
    navigate(`/${item.type}/${item.id}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        try {
          const [charsRes, epsRes, locsRes] = await Promise.all([
            fetch('https://thesimpsonsapi.com/api/characters?page=1'),
            fetch('https://thesimpsonsapi.com/api/episodes?page=1'),
            fetch('https://thesimpsonsapi.com/api/locations?page=1')
          ]);

          const charsData = await charsRes.json();
          const epsData = await epsRes.json();
          const locsData = await locsRes.json();

          const chars = charsData.results || [];
          const eps = epsData.results || [];
          const locs = locsData.results || [];

          const lowerQuery = searchQuery.toLowerCase();
          
          const formatResult = (item, type) => ({ ...item, type, label: item.name });
          
          const charResults = chars
            .filter(i => i.name && i.name.toLowerCase().includes(lowerQuery))
            .map(i => formatResult(i, 'character'));
            
          const epResults = eps
            .filter(i => i.name && i.name.toLowerCase().includes(lowerQuery))
            .map(i => formatResult(i, 'episode'));
            
          const locResults = locs
            .filter(i => i.name && i.name.toLowerCase().includes(lowerQuery))
            .map(i => formatResult(i, 'location'));

          const combined = [...charResults, ...epResults, ...locResults].slice(0, 8);
          setSearchResults(combined);
          setShowDropdown(true);
        } catch (error) {
          console.error("Autocomplete failed", error);
        }
      } else {
        setShowDropdown(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <GinoPopup show={showGino} onClose={handleCloseGino} />
    <nav className="navbar mb-3" style={{
      backgroundColor: "#87CEEB",
      borderBottom: "4px solid #000",
      padding: "10px 0"
    }}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between w-100 gap-2">
          <Link to="/" className="text-decoration-none" onClick={handleClearSearch}>
            <span className="navbar-brand mb-0 h1" style={{
              fontFamily: "'Creepster', cursive",
              fontSize: "clamp(1.2rem, 4vw, 2rem)",
              color: "#FFD90F",
              textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
            }}>
              The Simpsons
            </span>
          </Link>
          <div className="d-flex align-items-center gap-2 flex-grow-1 justify-content-end" style={{ maxWidth: "500px" }}>
            <form onSubmit={handleSearch} className="d-flex position-relative flex-grow-1" role="search" ref={searchRef} style={{ minWidth: "120px" }}>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={searchQuery}
                autoComplete="off"
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "3px solid #000",
                  borderRadius: "10px 0 0 10px",
                  fontWeight: "bold",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)"
                }}
              />
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#FFD90F",
                  color: "#000",
                  border: "3px solid #000",
                  borderLeft: "none",
                  borderRadius: "0 10px 10px 0",
                  fontWeight: "bold",
                  padding: "0.375rem 0.5rem"
                }}
                aria-label="Search"
              >
                🔍
              </button>
              {showDropdown && searchResults.length > 0 && (
                <ul className="dropdown-menu show w-100" style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "5px",
                  border: "3px solid #000",
                  backgroundColor: "#fff",
                  maxHeight: "300px",
                  overflowY: "auto",
                  zIndex: 1000
                }}>
                  {searchResults.map((item, index) => (
                    <li key={`${item.type}-${item.id}-${index}`}>
                      <button
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        onClick={() => handleResultClick(item)}
                        type="button"
                        style={{ cursor: "pointer", fontSize: "0.9rem" }}
                      >
                        <span className="text-truncate" style={{ maxWidth: "70%" }}>{item.name}</span>
                        <span className="badge rounded-pill" style={{ backgroundColor: "#87CEEB", color: "#000", border: "1px solid #000", fontSize: "0.65rem" }}>
                          {item.type}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </form>
            <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label={`View favorites, ${store.favorites.length} items`}
              style={{
                backgroundColor: "#FFD90F",
                color: "#000",
                border: "3px solid #000",
                fontWeight: "bold"
              }}
            >
              <span aria-hidden="true">❤️</span> Favorites <span className="badge" style={{
                backgroundColor: "#FF0000",
                color: "#fff"
              }} aria-label={`${store.favorites.length} favorites`}>{store.favorites.length}</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favoritesDropdown"
              style={{
                minWidth: "300px",
                backgroundColor: "#87CEEB",
                border: "3px solid #000"
              }}
            >
              {store.favorites.length === 0 ? (
                <li className="dropdown-item text-center" style={{ color: "#000" }}>
                  No favorites yet!
                </li>
              ) : (
                <>
                  {store.favorites.map((fav) => (
                  <li
                    key={fav.id}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    style={{
                      borderBottom: "2px solid #000",
                      padding: "10px"
                    }}
                  >
                    <Link
                      to={`/${
                        fav.type === 'episode' ? 'episode' :
                        fav.type === 'location' ? 'location' :
                        'character'
                      }/${fav.id}`}
                      className="text-decoration-none flex-grow-1"
                      style={{ color: "#000", fontWeight: "bold" }}
                    >
                      {fav.name}
                    </Link>
                    <button
                      className="btn btn-sm ms-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(fav);
                      }}
                      aria-label={`Remove ${fav.name} from favorites`}
                      style={{
                        backgroundColor: "#FFD90F",
                        border: "2px solid #000",
                        color: "#000"
                      }}
                    >
                      <span aria-hidden="true">🗑️</span>
                    </button>
                  </li>
                  ))}
                  <li>
                    <Link
                      to="/favorites"
                      className="dropdown-item text-center"
                      style={{
                        fontWeight: "bold",
                        color: "#000",
                        backgroundColor: "#FFD90F",
                        borderTop: "3px solid #000",
                        padding: "10px"
                      }}
                    >
                      View All Favorites
                    </Link>
                  </li>
                </>
              )}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};