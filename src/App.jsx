import Homepage from "./components/Homepage.jsx";
import Layout from "./components/Layout.jsx";
import Pokemon from "./components/Pokemon.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/pokemondb/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
