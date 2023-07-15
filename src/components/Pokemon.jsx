import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/Global";
import "../styles/Pokemon.css";

function Pokemon() {
  const { getPokemon, pokemon: pokemonItem, loading } = useGlobalContext();
  const { name } = useParams();

  const { id, sprites, types, height, weight, abilities } = pokemonItem;

  const [species, setSpecies] = useState([]);

  // get pokemon species
  const getSpecies = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await res.json();
    setSpecies(data.egg_groups);
  };

  const previousPokemonId = id > 0 ? id - 1 : 0;

  useEffect(() => {
    getPokemon(name);
  }, [name]);

  useEffect(() => {
    if (pokemonItem.id) {
      getSpecies(pokemonItem.id);
    }
  }, [pokemonItem]);

  return (
    <div className="Pokemon">
      <div className="back">
        <Link to={"/"}>Back to Home</Link>
      </div>
      <div className="prev-next-pokemon-container">
        <Link
          style={{ display: previousPokemonId === 0 ? "none" : "" }}
          className="previous-pokemon"
          to={`/pokemon/${previousPokemonId}`}
        >
          Previous Pokemon
        </Link>
        <Link className="next-pokemon" to={`/pokemon/${id + 1}`}>
          Next Pokemon
        </Link>
      </div>
      <h2>{pokemonItem.name}</h2>
      <div className="pokemon-card">
        <div className="pokemon-card__image-container">
          <img
            src={sprites?.other["official-artwork"].front_default}
            alt="pokemon-image"
          />
        </div>
        <div className="pokemon-card__data-details">
          <h3>Pokédex Data</h3>
          <p>
            <span>national no. </span>
            <span>{id}</span>
          </p>
          <p className="pokemon-card__data-details__types">
            <span>type</span>
            {types?.map((type) => {
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
                    margin: "0 .1rem",
                    padding: ".5rem",
                    borderRadius: "5px",
                    textTransform: "capitalize",
                    border: ".5px solid lightgray",
                    width: "80px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={type.type.name}
                >
                  {type.type.name}
                </span>
              );
            })}
          </p>
          <p className="species">
            <span>species</span>

            {species.map((name) => {
              return <span key={name.name}>{name.name}</span>;
            })}
          </p>
          <p>
            <span>Height</span>
            <span className="height">
              {height?.toString().slice(0, -1) +
                "." +
                height?.toString().slice(-1)}{" "}
              m
            </span>
          </p>
          <p>
            <span>Weight</span>
            <span className="weight">
              {weight?.toString().slice(0, -1) +
                "." +
                weight?.toString().slice(-1)}{" "}
              kg
            </span>
          </p>
          <p className="abilities">
            <span>Abilities</span>
            {abilities?.map((ability) => {
              return (
                <span className="ability" key={ability.ability.name}>
                  {ability.ability.name}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
