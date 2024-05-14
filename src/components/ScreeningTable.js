import { useContext, useEffect, useState } from "react";
import api from "../Api.js";
import { UserContext } from "../context/UserContext.js";
import RepertoireModal from "../modals/RepertoireModal.js";

const ScreeningTable = ({ movies, onDeleteMovie }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieList, setMovieList] = useState(null);
  const [moviesForUpdate, setMoviesForUpdate] = useState([]);
  const [count, setCount] = useState(8);
  const { user } = useContext(UserContext);
  const [warning,setWarning]=useState(false);
  const [success,setSucces]=useState(false);
  const [forbidDelete,setForbidDelete]=useState(false);
  const [loadingMessage,setLoadingMessage]=useState(false);
  const [clickedDelete,setClickedDelete]=useState(false);
  const headers = {
    Authorization: `Bearer ${user.token}`
  };

  const closeForbidDelete=()=>{
    setForbidDelete(false);
  }

  const closeSuccess=()=>{
    setSucces(false);
  }

  const keys = Object.keys((movies && movies[0]) || {});

  const toggleDelete = (id) => {
    setClickedDelete((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
  }, [moviesForUpdate]);

  const handleUpdateRepertoire = () => {
    const ms = [];
    moviesForUpdate.map(async (m) => {
      const movie = {
        id: m.id,
        title: m.title,
        language: m.language,
        countryOfOrigin: m.country,
        director: m.director,
        genre: m.genre,
        poster: m.poster,
        isPlaying: m.isPlaying
      };
      ms.push(movie);
    })
    setMovieList(ms);
  }

  useEffect(() => {
    if (movieList === null) {
      return;
    }
    if(count!=8){
      setWarning(true);
      return;
    }
      const updateMovie = async () => {
        try {
          setSucces(true);
          setLoadingMessage(true);
          const response=await api.put("api/movies/update", movieList, { headers });
          if(response.status===200){
            setLoadingMessage(false);
          }
        } catch (err) {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
      updateMovie();
  }, [movieList])

  const handleDelete=(movie)=>{
    if(movie.isPlaying===true){
      setForbidDelete(true);
      return;
    }
    setForbidDelete(false);
    onDeleteMovie(movie);
  }

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div className="searchBar search-bar-screenings" style={{ display: "flex", height: "40px", alignItems: "baseline" }}>
        <button className="button-85 button-screenings" style={{ position: "sticky", top: 0, zIndex: 1, height: "50px", marginRight: "575px" }} onClick={handleUpdateRepertoire}>Update repertoire</button>
        {warning && <RepertoireModal message="You need to choose exactly 8 movies for the repertoire!" isOpen={warning} onClose={() => setWarning(false)} />}
        {success && <RepertoireModal message={loadingMessage ? "Hold on..." : "Repertoire updated!"}  isOpen={success} onClose={closeSuccess} />}
        {forbidDelete && <RepertoireModal message={'This movie cannot be deleted because it is currently playing.' } isOpen={forbidDelete} onClose={closeForbidDelete} />}
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
              <th style={{paddingRight:"20px"}}>Delete movie</th>
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

                {!clickedDelete[movie.id] && (
                <td style={{ paddingLeft: 0, paddingRight: "20px", width: "175px" }}>
                  <button className="button-85" style={{marginLeft:0, marginBottom:"10px",width:"fit-content"}} onClick={() => toggleDelete(movie.id)} >Delete</button>
                </td>
              )}
              {clickedDelete[movie.id] && (
                <td style={{ paddingRight: 0, width: "175px"}}>
                  <button style={{ marginLeft: 0, marginRight: "15px" }} onClick={() => handleDelete(movie)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg></button>

                  <button style={{ marginLeft: 0 }} onClick={() => toggleDelete(movie.id)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg></button>
                </td>
              )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScreeningTable;
