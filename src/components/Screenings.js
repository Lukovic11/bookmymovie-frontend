import { useEffect, useState } from "react";
import ScreeningTable from "./ScreeningTable";
import api from "../Api.js"


const Screenings = () => {
  const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const getMovies = async () => {
        try {
          const response = await api.get("/api/movies");
          const moviesWithSpecificAttributes = response.data.map(movie => ({
            id:movie.id,
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
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`);
          }
        }
      }
      getMovies();
      // setLoading(false);
    }, 1000)
  }, [])


  return (
    <div className="users">
      <div className='not-found'></div>
      {/* {loading ? <div className="loader"> </div> : */}
        <ScreeningTable movies={movies} />
      {/* } */}
    </div>
  );
}

export default Screenings;