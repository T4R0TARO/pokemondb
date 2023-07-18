# Under Development 🛠

### Get Pokemon Data

1.  fetch all pokemon data when page first loads
2.  save data to state
3.  pass state to Global Provider

```jsx
// Global.jsx
const GlobalContext = createContext();
const baseUrl = "https://pokeapi.co/api/v2/";

const ACTION = {
  LAODING: "LOADING",
  GET_ALL_POKEMON: "GET_ALL_POKEMON",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.LOADING:
      return { ...state, loading: true };
    case ACTION.GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
    allPokemon: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // State
  const [allPokemonData, setAllPokemonData] = useState([]);

  // 1️⃣ get all pokemon
  const getAllPokemon = async () => {
    dispatch({ type: ACTION.LOADING });
    const res = await fetch(`${baseUrl}pokemon/?limit=20`);
    const data = await res.json();
    dispatch({ type: ACTION.GET_ALL_POKEMON, payload: data });

    /* `data` output:
			-   count:1281
			-   next:"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
			-   previous:null
			-   results: [] 20 items
			
				`data.results` output:
			 0: {}
				 -   name:"bulbasaur"
				 -   url:"https://pokeapi.co/api/v2/pokemon/1/"
			 1: {}
				 -   name:"ivysaur"
				 -   url:"https://pokeapi.co/api/v2/pokemon/2/"
				etc...

			1.Our data provides a `name` and `url`
			2.We need to fetch the data from the objects `url`
			3.Create an arr `allPokemonData`
			4.Iterate through the `data.results` items 
			5.Access the items url and fetch the data `pokemon.url`
			6.Push the data to the arr `allPokemonData`
			7.Set the arr data `pokemonData` to state `allPokemonData`
		*/

    // fetch pokemon obj data url
    const allPokemonData = [];
    for (const pokemon of data.results) {
      const pokemonRes = await fetch(pokemon.url);
      const pokemonData = await pokemonRes.json();
      allPokemonData.push(pokemonData);
    }
    // 2️⃣ Save data to state
    setAllPokemonData(allPokemonData);
  };

  // When page loads run f()
  useEffect(() => {
    getAllPokemon();
  }, []);

  // 3️⃣ Pass state, allPokemonData to Global Provider and it's children
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

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
```

---

### Get Pokemon

```jsx

```

---

### Load More Data Button

```jsx

```

---
