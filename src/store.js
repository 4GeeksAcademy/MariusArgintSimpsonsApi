const STORAGE_KEY = 'simpsons_favorites';

/**
 * Load favorites from localStorage
 */
const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem(STORAGE_KEY);
    if (savedFavorites) {
      const parsed = JSON.parse(savedFavorites);
      // Validate that it's an array
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
  }
  return [];
};

/**
 * Save favorites to localStorage
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

export const initialStore = () => {
  return {
    characters: [],
    episodes: [],
    locations: [],
    favorites: loadFavorites(),
    searchQuery: ""
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_characters':
      return {
        ...store,
        characters: action.payload
      };

    case 'set_episodes':
      return {
        ...store,
        episodes: action.payload
      };

    case 'set_locations':
      return {
        ...store,
        locations: action.payload
      };

    case 'add_favorite':
      if (store.favorites.some(fav => fav.id === action.payload.id && fav.type === action.payload.type)) {
        return store;
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.id === action.payload.id && fav.type === action.payload.type)
        )
      };

    case 'set_search_query':
      return {
        ...store,
        searchQuery: action.payload
      };

    default:
      if (import.meta.env.DEV) {
        console.error('Unknown action:', action.type);
      }
      return store;
  }
}
