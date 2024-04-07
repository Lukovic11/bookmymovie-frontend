import { useEffect } from "react";
import { useState } from "react";
import { Movies } from '../movies.js'
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

const ComingSoon = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const comingSoonMovies = Movies.filter(movie => movie.nowPlaying === false);
    setMovies(comingSoonMovies);
  }, [])

  return (
    <div className="screenings">
      <h1>Coming soon</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-item" key={movie.id} >
            <div className="flex">
              <img
                src={movie.poster}
                alt={movie.title}
              />
              <Link to={`/movies/${movie.id}`}>
                <button className='button-85'>Details</button>
              </Link>
            </div>
            <div className="movie-details">
              <Link to={`/movies/${movie.id}`}>
                <h2>{movie.title}</h2>
                <p>{movie.genre} | {movie.duration} min</p>
              </Link>
            </div>
          </div>
        ))

        }
      </div>
    </div>
  );
}

export default ComingSoon;