import PokeSearchResults from "./PokeSearchResults";
import { useGlobalContext } from "../context/Global";
import "../styles/Homepage.css";

function Homepage() {
  const { search, handleChange, handleSubmit } = useGlobalContext();

  return (
    <main className="Homepage">
      <form action="" className="search-form" onSubmit={handleSubmit}>
        <div className="input-control">
          <span>Name: </span>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={handleChange}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
      </form>
      {/* <AllPokeData /> */}
      <PokeSearchResults />
    </main>
  );
}

export default Homepage;
