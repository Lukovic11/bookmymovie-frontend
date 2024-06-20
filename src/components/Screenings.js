import { useEffect, useState } from "react";
import ScreeningTable from "./ScreeningTable";
import api from "../Api.js";
import Alert from "../modals/AlertModal.js";
import Success from "../modals/SuccessModal.js";

const Screenings = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myAlertGet, setMyAlertGet] = useState(false);
  const [myAlertDelete, setMyAlertDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);

  const handleDeleteMovie = async (movie) => {
    try {
      await api.delete("/api/movies/" + movie.id);
    } catch (err) {
      if (err.response) {
        setMyAlertDelete(true);
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
    setSuccessDelete(true);
  };

  useEffect(() => {
    setTimeout(() => {
      const getMovies = async () => {
        try {
          const response = await api.get("/api/movies");
          const moviesWithSpecificAttributes = response.data.map((movie) => ({
            id: movie.id,
            poster: movie.poster,
            title: movie.title,
            director: movie.director,
            genre: movie.genre,
            country: movie.countryOfOrigin,
            language: movie.language,
            isPlaying: movie.isPlaying,
          }));
          setMovies(moviesWithSpecificAttributes);
        } catch (err) {
          if (err.response) {
            setMyAlertGet(true);
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      };
      getMovies();
      setLoading(false);
    }, 1000);
  }, [handleDeleteMovie]);

  return (
    <div>
      <div
        className={`users ${
          myAlertGet || myAlertDelete ? "blur-background" : ""
        }`}
      >
        <div className="not-found"></div>
        {loading ? (
          <div className="loader"> </div>
        ) : (
          <ScreeningTable movies={movies} onDeleteMovie={handleDeleteMovie} />
        )}
      </div>
      {myAlertGet && (
        <Alert message={"Sorry, the system could not load the screenings."} />
      )}
      {myAlertDelete && (
        <Alert message={"Sorry, the system could not delete the movie."} />
      )}
      {successDelete && (
        <Success
          message={"Successfully deleted."}
          onClose={() => setSuccessDelete(false)}
        />
      )}
    </div>
  );
};

export default Screenings;
