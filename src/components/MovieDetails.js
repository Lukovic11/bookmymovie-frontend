import { useEffect,useContext } from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../Api.js"
import BookTicketsModal from './BookTicketsModal.js';
import EmptyUserContextModal from './EmptyUserContextModal'
import { UserContext } from "./UserContext";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen]=useState(false);
  const [isUserContextModalOpen, setIsUserContextModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  const openModal = () => {
    if (user.id!=null) {
      setIsModalOpen(true);
    } else {
      setIsUserContextModalOpen(true);
    }
  };

  const closeModal=()=>{
    setIsModalOpen(false);
    setIsUserContextModalOpen(false);
  }

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await api.get("/api/movies/" + id);
        setMovie(response.data);
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
    getMovie();
  }, [id])

  const [youtubeUrl, setYoutubeUrl] = useState('');


  useEffect(() => {
    const fetchYoutubeLink = async () => {
      try {
        if (movie && movie.trailer) {
          const trailerLink = movie.trailer;
          const videoId = trailerLink.split('v=')[1];
          const vid=videoId.split('&t=')[0];
          const embedUrl = `https://www.youtube.com/embed/${vid}`;
          setYoutubeUrl(embedUrl);
        }
      } catch (error) {
        console.error('Error fetching YouTube link.');
      }
    };

    fetchYoutubeLink();
  }, [movie]);

  if (!movie) {
    return navigate('/not-found');
  }


  return (
    <div className="movie-details-page">
      <h1>{movie.title} ({movie.yearOfRelease})</h1>
      <div className="flex">
        <img src={movie.poster} alt={movie.title} />
        <div className="details">
          <p>{movie.genre} | {movie.duration} min</p>
          <p>Directed by: {movie.director}</p>
          <p>Language: {movie.language}</p>
          <p>Country of origin: {movie.countryOfOrigin}</p>
          <p>{movie.description}</p>
          {youtubeUrl && (
            <iframe
              src={youtubeUrl}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {movie.isPlaying && <button className="button-85" onClick={openModal}>
            Book Tickets
          </button>}
          {isModalOpen && (
            <BookTicketsModal isOpen={isModalOpen} onClose={closeModal} id={id} />
          )}
          {isUserContextModalOpen && (
            <EmptyUserContextModal isOpen={isUserContextModalOpen} onClose={closeModal} />
          )}
          {!movie.isPlaying && <p className="not-available">Coming soon.</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
