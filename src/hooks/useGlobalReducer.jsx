import { useContext, useReducer, createContext, useEffect } from "react";
import PropTypes from "prop-types";
import storeReducer, { initialStore, saveFavorites } from "../store"

const StoreContext = createContext()

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    // Persist favorites to localStorage whenever they change
    useEffect(() => {
        saveFavorites(store.favorites);
    }, [store.favorites]);

    return <StoreContext.Provider value={{ store, dispatch }}>
        {children}
    </StoreContext.Provider>
}

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}