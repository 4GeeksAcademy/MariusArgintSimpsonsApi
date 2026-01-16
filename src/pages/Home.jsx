import { useEffect, useState, useCallback } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card";
import { NelsonPopup } from "../components/NelsonPopup";
import { GinoPopup } from "../components/GinoPopup";
import { Hero } from "../components/Hero";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNelson, setShowNelson] = useState(false);
  const [showGino, setShowGino] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.all([
          fetch("https://thesimpsonsapi.com/api/characters?page=1"),
          fetch("https://thesimpsonsapi.com/api/characters?page=2"),
          fetch("https://thesimpsonsapi.com/api/characters?page=3")
        ]);

        responses.forEach((res, index) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} on page ${index + 1}`);
          }
        });

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        const allCharacters = dataArrays.flatMap(data => data.results);

        const uniqueCharacters = Array.from(
          new Map(allCharacters.map(char => [char.id, char])).values()
        );

        const validCharacters = uniqueCharacters
          .filter(char => char.name && char.name.trim() !== '')
          .slice(0, 60);

        dispatch({ type: "set_characters", payload: validCharacters });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (store.characters.length === 0) {
      fetchData();
    }
  }, [store.characters.length, dispatch]);

  const handleAddFavorite = (item) => {
    const isFav = store.favorites.some(fav => fav.id === item.id && fav.type === 'character');

    if (isFav) {
      dispatch({ type: "remove_favorite", payload: { id: item.id, type: 'character' } });
      if (item.name === "Bart Simpson") {
        setShowGino(true);
      }
    } else {
      dispatch({ type: "add_favorite", payload: { ...item, type: 'character' } });
      setShowNelson(true);
    }
  };

  const isFavorite = (id) => {
    return store.favorites.some(fav => fav.id === id && fav.type === 'character');
  };

  const handleCloseNelson = useCallback(() => {
    setShowNelson(false);
  }, []);

  const handleCloseGino = useCallback(() => {
    setShowGino(false);
  }, []);

  const filtereddd .
  haracters = store.searchQuery
    ? store.characters.filter(char =>
        char.name.toLowerCase().includes(store.searchQuery.toLowerCase())
      )
    : store.characters;

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: "#FFD90F" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <h2 style={{ color: "#FFD90F" }}>D'oh! Something went wrong</h2>
        <p style={{ color: "#000", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", border: "3px solid #000" }}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-lg mt-3"
          style={{
            backgroundColor: "#FFD90F",
            color: "#000",
            border: "3px solid #000",
            fontWeight: "bold"
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <NelsonPopup show={showNelson} onClose={handleCloseNelson} />
      <GinoPopup show={showGino} onClose={handleCloseGino} />
      <Hero />
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{
          fontFamily: "'Creepster', cursive",
          fontSize: "3rem",
          color: "#FFD90F",
          textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
        }}>
          The Simpsons Characters
        </h1>
        <div className="row g-4">
          {store.characters.map((character) => (
            <div key={character.id} className="col-md-4 col-lg-3 col-sm-6">
              <Card
                item={character}
                onAddFavorite={handleAddFavorite}
                isFavorite={isFavorite(character.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}; 