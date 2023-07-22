// import Pokeball from "../images/pokeball.png";
import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loader">
      <div className="loader-spinner">
        <img src="../pokeball.png" alt="loader-image" />
      </div>
    </div>
  );
}

export default Loader;
