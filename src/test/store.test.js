import { describe, it, expect, beforeEach } from 'vitest';
import storeReducer, { initialStore } from '../store';

describe('storeReducer', () => {
  let state;

  beforeEach(() => {
    state = initialStore();
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('add_favorite', () => {
    it('should add a favorite', () => {
      const character = { id: 1, name: 'Homer Simpson', type: 'character' };
      const action = {
        type: 'add_favorite',
        payload: character
      };

      const newState = storeReducer(state, action);

      expect(newState.favorites).toHaveLength(1);
      expect(newState.favorites[0]).toEqual(character);
    });

    it('should not add duplicate favorites', () => {
      const character = { id: 1, name: 'Homer Simpson', type: 'character' };
      const stateWithFavorite = {
        ...state,
        favorites: [character]
      };

      const action = {
        type: 'add_favorite',
        payload: character
      };

      const newState = storeReducer(stateWithFavorite, action);

      expect(newState.favorites).toHaveLength(1);
      expect(newState).toBe(stateWithFavorite); // Should return same state
    });

    it('should allow different types with same id', () => {
      const character = { id: 1, name: 'Homer Simpson', type: 'character' };
      const episode = { id: 1, name: 'Simpsons Roasting on an Open Fire', type: 'episode' };

      let newState = storeReducer(state, {
        type: 'add_favorite',
        payload: character
      });

      newState = storeReducer(newState, {
        type: 'add_favorite',
        payload: episode
      });

      expect(newState.favorites).toHaveLength(2);
    });
  });

  describe('remove_favorite', () => {
    it('should remove a favorite', () => {
      const character = { id: 1, name: 'Homer Simpson', type: 'character' };
      const stateWithFavorite = {
        ...state,
        favorites: [character]
      };

      const action = {
        type: 'remove_favorite',
        payload: { id: 1, type: 'character' }
      };

      const newState = storeReducer(stateWithFavorite, action);

      expect(newState.favorites).toHaveLength(0);
    });

    it('should only remove the matching type', () => {
      const character = { id: 1, name: 'Homer Simpson', type: 'character' };
      const episode = { id: 1, name: 'Episode 1', type: 'episode' };
      const stateWithFavorites = {
        ...state,
        favorites: [character, episode]
      };

      const action = {
        type: 'remove_favorite',
        payload: { id: 1, type: 'character' }
      };

      const newState = storeReducer(stateWithFavorites, action);

      expect(newState.favorites).toHaveLength(1);
      expect(newState.favorites[0].type).toBe('episode');
    });
  });

  describe('set_characters', () => {
    it('should set characters', () => {
      const characters = [
        { id: 1, name: 'Homer Simpson' },
        { id: 2, name: 'Marge Simpson' }
      ];

      const action = {
        type: 'set_characters',
        payload: characters
      };

      const newState = storeReducer(state, action);

      expect(newState.characters).toEqual(characters);
      expect(newState.characters).toHaveLength(2);
    });
  });

  describe('set_episodes', () => {
    it('should set episodes', () => {
      const episodes = [
        { id: 1, name: 'Episode 1' },
        { id: 2, name: 'Episode 2' }
      ];

      const action = {
        type: 'set_episodes',
        payload: episodes
      };

      const newState = storeReducer(state, action);

      expect(newState.episodes).toEqual(episodes);
    });
  });

  describe('set_locations', () => {
    it('should set locations', () => {
      const locations = [
        { id: 1, name: 'Location 1' },
        { id: 2, name: 'Location 2' }
      ];

      const action = {
        type: 'set_locations',
        payload: locations
      };

      const newState = storeReducer(state, action);

      expect(newState.locations).toEqual(locations);
    });
  });

  describe('unknown action', () => {
    it('should return the same state for unknown actions', () => {
      const action = {
        type: 'unknown_action',
        payload: {}
      };

      const newState = storeReducer(state, action);

      expect(newState).toBe(state);
    });
  });
});
