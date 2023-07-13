import { Link } from "react-router-dom";

function Pokemon() {
  return (
    <div>
      <div className="back">
        <Link to={"/"}>Back to Home</Link>
      </div>
      <h3>Pokemon</h3>
    </div>
  );
}

export default Pokemon;
