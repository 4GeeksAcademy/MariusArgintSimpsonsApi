import useGlobalReducer from "./useGlobalReducer.jsx";

/**
 * Custom hook for managing favorites
 * Provides consistent favorite management across all components
 */
export const useFavorites = () => {
  const { store, dispatch } = useGlobalReducer();

  /**
   * Toggle a favorite (add if not present, remove if present)
   * @param {Object} item - The item to toggle
   * @param {string} type - Type of item ('character', 'episode', or 'location')
   */
  const toggleFavorite = (item, type) => {
    const isFavorite = store.favorites.some(
      fav => fav.id === item.id && fav.type === type
    );

    if (isFavorite) {
      dispatch({
        type: "remove_favorite",
        payload: { id: item.id, type }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { ...item, type }
      });
    }
  };

  /**
   * Check if an item is favorited
   * @param {number} id - The item ID
   * @param {string} type - Type of item ('character', 'episode', or 'location')
   * @returns {boolean} Whether the item is favorited
   */
  const isFavorite = (id, type) => {
    return store.favorites.some(
      fav => fav.id === id && fav.type === type
    );
  };

  return {
    toggleFavorite,
    isFavorite,
    favorites: store.favorites
  };
};
