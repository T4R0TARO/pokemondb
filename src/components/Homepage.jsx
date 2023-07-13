import AllPokeData from "./AllPokeData";
import "../styles/Homepage.css";

function Homepage() {
  return (
    <main className="Homepage">
      <form action="" className="search-form">
        <div className="input-control">
          <span>Name: </span>
          <input type="text" placeholder="Search Pokemon" />
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
      </form>
      <AllPokeData />
    </main>
  );
}

export default Homepage;
