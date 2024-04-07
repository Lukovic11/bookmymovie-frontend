import { Movies } from '../movies';
import { useEffect } from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const MovieDetails = ({ match }) => {
  const { id } = match.params;
  const movie = Movies.find(movie => movie.id === parseInt(id));

  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    const fetchYoutubeLink = async () => {
      try {
        const trailerLink = movie.trailer;
        const videoId = trailerLink.split('v=')[1];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setYoutubeUrl(embedUrl);
      } catch (error) {
        console.error('Error fetching YouTube link.');
      }
    };

    fetchYoutubeLink();
  }, [movie]);

  if (!movie) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div className="movie-details-page">
      <h1>{movie.title} ({movie.yearofrelease})</h1>
      <div className="flex">
        <img src={movie.poster} alt={movie.title} />
        <div className="details">
          <p>{movie.genre} | {movie.duration} min</p>
          <p>Directed by: {movie.director}</p>
          <p>Language: {movie.language}</p>
          <p>Country of origin: {movie.countryoforigin}</p>
          <p>{movie.description}</p>
          {youtubeUrl && (
            <iframe
              src={youtubeUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {movie.nowPlaying && <button className="button-85">
            Book Tickets
          </button>}
          {!movie.nowPlaying && <p className='not-available'>Coming soon.</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
