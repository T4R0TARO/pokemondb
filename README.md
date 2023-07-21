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

1.  fetch pokemon data
2.  save data in state
3.  pass state and f() in Global Provider

```jsx
// Global.jsx

// code...
export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    // code...
    pokemon: {},
  };

  // 1️⃣ get pokemon
  const getPokemon = async (name) => {
    dispatch({ type: ACTION.LOADING });
    const response = await fetch(`${baseUrl}pokemon/${name}`);
    const data = await response.json();
    // 2️⃣ save data to state
    dispatch({ type: ACTION.GET_POKEMON, payload: data });
  };

  // code ...

  // 3️⃣ pass state to provider
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        allPokemonData,
        getPokemon,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
```

4.  call f() when component renders

```jsx
// Pokemon.jsx

function Pokemon() {
  const { getPokemon, pokemon: pokemonItem, loading } = useGlobalContext();

  // * hook returns an obj from the current URL taht were matched iby the <Route path>
  const { name } = useParams();

  // 4️⃣ call f() when component renders
  // * call f() when param `name` changes
  useEffect(() => {
    getPokemon(name);
  }, [name]);

  return <div className="Pokemon">{/*code...*/}</div>;
}
```

---

### Load More Data Button

1. Create f() next to access current states `next`
2. Update `ACTION.GET_ALL_POKEMON` to save next url
3. Update `ACTION.NEXT` to save the prevState of `allPokemonData` and the newly fetched data
4. Update `ACTION.NEXT` to save the new next url for the next 20 pokemon data
5. next() should access state `next` and iterate through the items of the new data AND
6. update `allPokemonData` by spreading its prevState and add the new items

data

```json
   count:1281
   next:"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20" 👈
   previous:null
   results: [] 20 items
```

next data

```json
   count:1281
   next:"https://pokeapi.co/api/v2/pokemon/?offset=60&limit=20" 👈
   previous:"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
   results: [] 20 items
```

```jsx
const ACTION = {
  // code...
  NEXT: "NEXT",
};

const reducer = (state, action) => {
  switch (action.type) {
    /**2️⃣ update action GET_ALL_POKEMON
     * inital state `next` payload access obj key `next`
     * `next.action.payload.next` save the url to the next 20 pokemon
     */
    case ACTION.GET_ALL_POKEMON:
      return {
        ...state,
        allPokemon: action.payload.results,
        next: action.payload.next,
        loading: false,
      };
    /** update action NEXT
     * 3️⃣initial state `allPokemon` spreads prevState `state.allPokemon` AND
     * `...action.payload.results` spreads data from the current payload results
     * 4️⃣`next:action.payload.next` updates state `next` with new url for next 20 pokemon
     *
     */
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

export const GlobalContextProvider = ({ children }) => {
  const initialState = {
    loading: false,
    allPokemon: [],
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

  //1️⃣ next/load more data
  /** next()
   * 5️⃣fetch data from current `state.next`
   * copy data in state `next`
   * create new arr `newPokemonData`
   * iterate through `data.results`
   * each item in `data.results` fetch the url
   * push `pokemonData` in `newPokemonData` arr
   * 6️⃣update state `allPokemonData`
   * spread it prevState `...allPokemonData`
   * and spread new data `...newPokemonData`
   * Now, `allPokemonData` should have old data AND new data
   */
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

  // code...

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
// code..
```

---

### Links

- Solution URL: [Git Repo](https://github.com/T4R0TARO/pokemondb)
- Live Site URL: [Git Pages](https://t4r0taro.github.io/pokemondb/)

### Built with

- HTML
- CSS
- JS
- REACT
- REACT-ROUTER-DOM
- VITE

## Author

- Website - [Joshua Manansala](https://github.com/T4R0TARO)
- Twitter - [@taro_code](https://twitter.com/taro_code)
