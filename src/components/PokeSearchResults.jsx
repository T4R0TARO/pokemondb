import { useGlobalContext } from "../context/Global";
import AllPokeData from "./AllPokeData.jsx";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "../styles/AllPokeData.css";

function PokeSearchResults() {
  const { isSearch, searchResults, loading } = useGlobalContext();

  const conditionalRender = () => {
    if (!isSearch) {
      return <AllPokeData />;
    } else {
      return (
        <div className="AllPokeData search-results-data">
          <table>
            <thead>
              <tr>
                <th>
                  <button>#</button>
                </th>
                <th>
                  <button>Name</button>
                </th>
                <th>Type</th>
                <th>Total</th>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Sp.Atk</th>
                <th>Sp.Def</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              {searchResults ? (
                <tr key={searchResults.id}>
                  <td className="sprite-image">
                    {searchResults.id}
                    <img src={searchResults.sprites?.front_default} alt="" />
                  </td>
                  <td className="mon-name">
                    <Link to={`/pokemon/${searchResults.name}`}>
                      {searchResults.name}
                    </Link>
                  </td>
                  <td className="types">
                    {searchResults?.types?.map((type) => {
                      return (
                        <span
                          style={{
                            background:
                              type.type.name === "grass"
                                ? "#7c5"
                                : type.type.name === "normal"
                                ? "#aa9"
                                : type.type.name === "fire"
                                ? "#f42"
                                : type.type.name === "water"
                                ? "#39f"
                                : type.type.name === "electric"
                                ? "#fc3"
                                : type.type.name === "ice"
                                ? "#6cf"
                                : type.type.name === "fighting"
                                ? "#b54"
                                : type.type.name === "poison"
                                ? "#a59"
                                : type.type.name === "ground"
                                ? "#db5"
                                : type.type.name === "flying"
                                ? "#89f"
                                : type.type.name === "psychic"
                                ? "#f59"
                                : type.type.name === "bug"
                                ? "#ab2"
                                : type.type.name === "rock"
                                ? "#ba6"
                                : type.type.name === "ghost"
                                ? "#66b"
                                : type.type.name === "dragon"
                                ? "#76e"
                                : type.type.name === "dark"
                                ? "#754"
                                : type.type.name === "steel"
                                ? "#aab"
                                : type.type.name === "fairy"
                                ? "#e9e"
                                : "white",
                            margin: ".2rem auto",
                          }}
                          key={type.type.name}
                        >
                          {type.type.name}
                        </span>
                      );
                    })}
                  </td>
                  <td className="total-base-stats">
                    <strong>
                      {searchResults.stats
                        ?.map((stat) => stat?.base_stat)
                        .reduce((acc, cur) => acc + cur, 0)}
                    </strong>
                  </td>
                  {searchResults.stats?.map((stat) => {
                    return <td key={stat.stat?.name}>{stat?.base_stat}</td>;
                  })}
                </tr>
              ) : (
                <Loader />
              )}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="search-results-container AllPokemonData">
      {conditionalRender()}
      {/* {loading ? <Loader /> : conditionalRender()} */}
    </div>
  );
}

export default PokeSearchResults;
