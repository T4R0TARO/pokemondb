import React from "react";
import { useGlobalContext } from "../context/Global";
import { Link } from "react-router-dom";

function AllPokeData() {
  const { allPokemonData } = useGlobalContext();

  return (
    <div className="AllPokeData">
      <h1>All Pokemon Data</h1>
    </div>
  );
}

export default AllPokeData;
