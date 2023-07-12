import { createContext, useContext, useState, useReducer } from "react";

const GlobalContext = createContext();
const baseUrl = "https://pokeapi.co/api/v2/";

const ACTION = {
  LAODING: "LOADING",
  SEARCH: "SEARCH",
  GET_ALL_POKEMON: "GET_ALL_POKEMON",
  GET_POKEMON: "GET_POKEMON",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true };
    case ACTION.GET_ALL_POKEMON:
      return { ...state, allPokemon: action.payload, loading: false };
    case ACTION.GET_POKEMON:
      return { ...state, pokemon: action.payload, loading: false };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
    isSearch: false,
    pokemonDataBase: [],
    searchResults: [],
    allPokemon: [],
    pokemon: {},
    next: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        allPokemonData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
