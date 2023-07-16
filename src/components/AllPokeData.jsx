import { useGlobalContext } from "../context/Global";
import { Link } from "react-router-dom";
import "../styles/AllPokeData.css";

function AllPokeData() {
  const { allPokemonData, next } = useGlobalContext();

  return (
    <div className="AllPokeData">
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
          {allPokemonData ? (
            allPokemonData.map((mon) => {
              return (
                <tr key={mon.id}>
                  <td className="sprite-image">
                    {mon.id}
                    <img src={mon.sprites.front_default} alt="" />
                  </td>
                  <td className="mon-name">
                    <Link to={`/pokemon/${mon.name}`}>{mon.name}</Link>
                  </td>
                  <td className="types">
                    {mon.types.map((type) => {
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
                      {mon.stats
                        .map((stat) => stat.base_stat)
                        .reduce((acc, cur) => acc + cur, 0)}
                    </strong>
                  </td>
                  <td>{mon.stats[0].base_stat}</td>
                  <td>{mon.stats[1].base_stat}</td>
                  <td>{mon.stats[2].base_stat}</td>
                  <td>{mon.stats[3].base_stat}</td>
                  <td>{mon.stats[4].base_stat}</td>
                  <td>{mon.stats[5].base_stat}</td>
                </tr>
              );
            })
          ) : (
            <span>Loading...</span>
          )}
        </tbody>
      </table>
      {/* Load More Pokemon */}
      <div className="next">
        {allPokemonData.length > 0 && (
          <button className="next-button" onClick={next}>
            load more &darr;
          </button>
        )}
      </div>
    </div>
  );
}

export default AllPokeData;
