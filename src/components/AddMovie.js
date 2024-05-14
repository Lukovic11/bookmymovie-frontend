import { useContext, useEffect, useState } from "react";
import countryList from 'react-select-country-list';
import CreatableSelect from "react-select/creatable";
import api from "../Api.js";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const AddMovie = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState(2000);
  const [duration, setDuration] = useState(120);
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [poster, setPoster] = useState('');
  const [trailer, setTrailer] = useState('');
  const currentYear = new Date().getFullYear('');
  const [error, setError] = useState('');
  const [errorDuration, setErrorDuration] = useState('');
  const [emptyField, setEmptyField] = useState(false);
  const options = countryList().getData().map(country => ({
    label: country.label,
    value: country.label
  }));
  const { user } = useContext(UserContext);
  const genres = [
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Adventure", value: "Adventure" },
    { label: "Animation", value: "Animation" },
    { label: "Biography", value: "Biography" },
    { label: "Comedy", value: "Comedy" },
    { label: "Coming of age", value: "Coming of age" },
    { label: "Crime", value: "Crime" },
    { label: "Documentary", value: "Documentary" },
    { label: "Drama", value: "Drama" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "History", value: "History" },
    { label: "Horror", value: "Horror" },
    { label: "Musical", value: "Musical" },
    { label: "Mystery", value: "Mystery" },
    { label: "Noir", value: "Noir" },
    { label: "Psychological Thriller", value: "Psychological Thriller" },
    { label: "Period Drama", value: "Period Drama" },
    { label: "Political", value: "Political" },
    { label: "Romance", value: "Romance" },
    { label: "Sci-fi", value: "Sci-fi" },
    { label: "Superhero", value: "Superhero" },
    { label: "Sports", value: "Sports" },
    { label: "Thriller", value: "Thriller" },
    { label: "War", value: "War" },
    { label: "Western", value: "Western" },
    { label: "Alternative", value: "Alternative" }
  ];

  const handleAddMovie = async () => {
    const movie = {
      title: title,
      description: description,
      yearOfRelease: parseFloat(year),
      duration: parseFloat(duration),
      language: language,
      countryOfOrigin: country,
      director: director,
      genre: genre,
      poster: poster,
      trailer: trailer,
      isPlaying: false
    };

    try {
      if (movie.title === '' || movie.description === '' || movie.language === ''
        || movie.countryOfOrigin === '' || movie.director === '' ||
        movie.genre === '' || movie.poster === '' || movie.trailer === '') {
        setEmptyField(true);
        return;
      }
      setEmptyField(false);
      const headers = {
        Authorization: `Bearer ${user.token}`
      };
      await api.post("/api/movies", movie, { headers });
      navigate("/screenings")
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


  const handleChange = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      setCountry(newValue ? newValue.value : null);
    }
  }

  const handleChangeGenre = (newValue, actionMeta) => {
    if (
      actionMeta.action === "select-option" ||
      actionMeta.action === "create-option"
    ) {
      setGenre(newValue ? newValue.value : null);
    }
  }

  useEffect(() => {
    if (year === null) {
      setError('');
      return;
    }

    const timeoutId = setTimeout(() => {
      const parsedYear = parseInt(year, 10);

      if (isNaN(parsedYear) || parsedYear < 1906 || parsedYear > currentYear) {
        setError(`Year should be between 1906 and ${currentYear}.`);
      } else {
        setError('');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [year, currentYear]);

  useEffect(() => {
    if (duration === null) {
      setErrorDuration('');
      return;
    }

    const timeoutId = setTimeout(() => {
      const parsedDuration = parseInt(duration, 10);

      if (isNaN(parsedDuration) || parsedDuration < 40) {
        setErrorDuration(`Duration should be more than 40 minutes.`);
      } else {
        setErrorDuration('');
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [duration]);


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#03090b', 
      borderRadius: '2mm', 
      color: 'white', 
      border: state.isFocused ? '2px solid #11212D' : '2px solid rgb(118, 118, 118)', 
      boxShadow: state.isFocused ? '0 0 5px #5e89c7' : 'none', 
      height: '25px', 
      width: '200px', 
      fontSize: '15px',
      marginBottom: '15px'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#03090b', 
      color: 'white', 
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#5e89c7' : '#03090b', 
      color: 'white', 
      padding: '10px', 
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white', 
    }),
  };


  return (
    <div className="add-movie users">
      <div className="not-found"></div>
      <div className="add-movie-form">
        {/*COLUMN 1*/}
        <div className="new-movie-data">
          <h1 style={{ marginBottom: "10px" }}>Add Movie</h1>
          {emptyField && <p style={{ color: "red", marginBottom: "-24px", paddingBottom: 0 }}>Please fill out all the fields</p>}
          {/* TITLE */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Title:</p>
          <input
            type="text"
            style={{
              width: "300px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1", paddingLeft: "10px"
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)} />

          {/* DESCRIPTION */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Description:</p>
          <textarea
            style={{
              width: "300px",
              height: "100px",
              borderRadius: "2mm",
              backgroundColor: "#03090b",
              opacity: "1",
              paddingLeft: "10px",
              paddingTop: "4px",
              marginBottom: "15px"
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          {/* DIRECTOR */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Director:</p>
          <input
            type="text"
            style={{
              width: "300px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1", paddingLeft: "10px"
            }}
            value={director}
            onChange={(e) => setDirector(e.target.value)} />


          {/* POSTER */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Poster (URL):</p>
          <input
            type="text"
            style={{
              width: "300px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1", paddingLeft: "10px"
            }}
            value={poster}
            onChange={(e) => setPoster(e.target.value)} />

          {/* TRAILER */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Trailer (URL):</p>
          <input
            type="text"
            style={{
              width: "300px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1", paddingLeft: "10px"
            }}
            value={trailer}
            onChange={(e) => setTrailer(e.target.value)} />
        </div>


        {/*COLUMN 2*/}
        <div className="new-movie-data" style={{ marginTop: "71px", marginLeft: "50px", marginRight: "30px" }}>

          {/* COUNTRY OF ORIGIN */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Country of origin:</p>

          <CreatableSelect
            isClearable
            options={options}
            onChange={handleChange}
            isValidNewOption={() => false}
            styles={customStyles}
          />

          {/* LANGUAGE */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Language:</p>
          <input
            type="text"
            style={{
              width: "200px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1", paddingLeft: "10px"
            }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)} />

          {/* GENRE */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Genre:</p>

          <CreatableSelect
            isClearable
            options={genres}
            onChange={handleChangeGenre}
            isValidNewOption={() => false}
            styles={customStyles}
          />

          {/* YEAR OF RELEASE */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Year of release:</p>
          <input
            type="number"
            style={{
              width: "100px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1",
              paddingTop: "2px",
              paddingLeft: "10px"
            }}
            value={year}
            min={1906}
            max={currentYear}
            onChange={(e) => setYear(e.target.value)} />
          {error && <p style={{ color: 'red', width: "fit-content", fontWeight: "400" }}>{error}</p>}

          {/* DURATION */}
          <p style={{ width: "fit-content", fontSize: "18px" }}>Duration:</p>
          <input
            type="number"
            style={{
              width: "100px", height: "25px", borderRadius: "2mm", backgroundColor: "#03090b",
              opacity: "1",
              paddingTop: "2px",
              paddingLeft: "10px"
            }}
            value={duration}
            min={40}
            onChange={(e) => setDuration(e.target.value)} />
          {errorDuration && <p style={{ color: 'red', width: "fit-content", fontWeight: "400" }}>{errorDuration}</p>}
        </div>
      </div>
      <button className="button-85 add-movie-button" onClick={handleAddMovie} >Add movie</button>

    </div>);
}

export default AddMovie;
