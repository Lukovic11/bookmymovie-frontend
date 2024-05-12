import { useEffect, useState } from "react";

const ScreeningTable = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesForUpdate, setMoviesForUpdate] = useState([]);
  const [count, setCount] = useState(8);

  const keys = Object.keys((movies && movies[0]) || {});


  const filteredData = movies.filter((movie) => {
    return keys.some((key) => {
      const value = movie[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  });

  const toggleSwitch = (movie, isChecked) => {
    console.log(isChecked)
    isChecked && setCount(count + 1);
    !isChecked && setCount(count - 1);
    if (movie.isPlaying === isChecked) {
      return;
    }
    movie.isPlaying = isChecked;
    if (!(moviesForUpdate.some(item => item.title === movie.title))) {
      setMoviesForUpdate(items => [...items, movie]);
    }
  }

  useEffect(() => {
    console.log(moviesForUpdate);
  }, [moviesForUpdate]);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div className="searchBar search-bar-screenings" style={{ display: "flex", height: "40px", alignItems: "baseline" }}>
      <button className="button-85 button-screenings" style={{ position: "sticky", top: 0, zIndex: 1 ,height:"50px",marginRight:"573px"}}>Update repertoire</button>
        <p className={count === 8 ? 'greenShadow' : 'redShadow'}>Movies playing: {count}</p>
        <input
          style={{ marginLeft: "50px" }}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <div className="table-container" style={{ 
          height: "450px", overflowY: "auto", marginTop: "30px", width: "100%"
        }}>
          <table className="data-table screening-table">
            <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                {keys.map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>
                    {movie.poster && (
                      <img src={movie.poster} alt={movie.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                  </td>
                  <td>{movie.title}</td>
                  <td>{movie.director}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.country}</td>
                  <td>{movie.language}</td>
                  <td>
                    <input
                      className="switch"
                      type="checkbox"
                      defaultChecked={movie.isPlaying}
                      onClick={(e) => toggleSwitch(movie, e.target.checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default ScreeningTable;
