import Pokeball from "../images/Pokeball.png";
import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loader">
      <div className="loader-spinner">
        {/* <img src="./pokeball.png" alt="loader-image" /> */}
        <img src={Pokeball} alt="loader-image" />
      </div>
    </div>
  );
}

export default Loader;
