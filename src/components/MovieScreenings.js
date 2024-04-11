import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../Api.js"

const MovieScreenings = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies=async()=>{
      try {
        const response=await api.get("/api/movies");
        console.log(response.data);
        const allMovies=response.data;
        setMovies(allMovies.filter(movie=>movie.isPlaying===true));
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
    getMovies();
  }, [])

  

  return (
    <div className="screenings">
      <h1>Now playing</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-item" key={movie.id} >
            <div className="flex">
            {movie.poster && <img src={movie.poster} alt={movie.title} />}
            <Link to={`${movie.id}`}>
              <button className='button-85'>Details</button>
              </Link>
            </div>
            <div className="movie-details">
              <Link to={`${movie.id}`}>
                <h2>{movie.title}</h2>
                <p>{movie.genre} | {movie.duration} min</p>
              </Link>
            </div>
          </div>
        ))

        }
      </div>
    </div>

  )
}

export default MovieScreenings;