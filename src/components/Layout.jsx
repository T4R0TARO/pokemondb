// import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h3>Pokémon Pokédex</h3>
      <Outlet />
    </div>
  );
}

export default Layout;
