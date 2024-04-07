import { useState, useEffect } from 'react';
import { Movies } from '../movies.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

const MovieScreenings = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const nowPlayingMovies = Movies.filter(movie => movie.nowPlaying === true);
    setMovies(nowPlayingMovies);
  }, [])


  return (
    <div className="screenings">
      <h1>Now playing</h1>
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

  )
}

export default MovieScreenings;