import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

const GlobalContext = createContext();
const baseUrl = "https://pokeapi.co/api/v2/";

const ACTION = {
  LAODING: "LOADING",
  SEARCH: "SEARCH",
  GET_ALL_POKEMON: "GET_ALL_POKEMON",
  GET_POKEMON: "GET_POKEMON",
  GET_POKEMON_DATABASE: " GET_POKEMON_DATABASE",
  NEXT: "NEXT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true };
    case ACTION.GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        loading: false,
      };
    case ACTION.GET_POKEMON:
      return { ...state, pokemon: action.payload, loading: false };
    case ACTION.GET_POKEMON_DATABASE:
      return { ...state, pokemonDatabase: action.payload, loading: false };
    case ACTION.NEXT:
      return {
        ...state,
        allPokemon: [...state.allPokemon, ...action.payload.results],
        next: action.payload.next,
        loading: false,
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
    isSearch: false,
    pokemonDatabase: [],
    searchResults: [],
    allPokemon: [],
    pokemon: {},
    next: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [allPokemonData, setAllPokemonData] = useState([]);

  // get all pokemon
  const getAllPokemon = async () => {
    dispatch({ type: ACTION.LOADING });
    const res = await fetch(`${baseUrl}pokemon/?limit=20`);
    const data = await res.json();
    dispatch({ type: ACTION.GET_ALL_POKEMON, payload: data });

    // fetch pokemon obj data url
    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }
    setAllPokemonData(allPokemonData);
  };

  // get pokemon
  const getPokemon = async (name) => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`${baseUrl}pokemon/${name}`);
    const data = await response.json();
    dispatch({ type: ACTION.GET_POKEMON, payload: data });
  };

  // get all pokemon data
  const getPokemonDatabase = async () => {
    dispatch({ type: ACTION.LAODING });
    const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
    const data = await res.json();
    dispatch({ type: ACTION.GET_POKEMON_DATABASE, payload: data.results });
  };

  // next/load more data
  const next = async () => {
    dispatch({ type: ACTION.LOADING });
    const res = await fetch(state.next);
    const data = await res.json();
    dispatch({ type: ACTION.NEXT, payload: data });

    const newPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      newPokemonData.push(pokemonData);
    }
    // add new pokemon data to the old pokemon data
    setAllPokemonData([...allPokemonData, ...newPokemonData]);
  };

  useEffect(() => {
    getAllPokemon();
    getPokemonDatabase();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        allPokemonData,
        getPokemon,
        next,
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
