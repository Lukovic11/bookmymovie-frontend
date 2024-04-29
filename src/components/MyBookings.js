import { useEffect, useContext, useState } from "react";
import api from "../Api.js"
import { UserContext } from "../context/UserContext.js";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (e, bookingId) => {
    e.preventDefault();
    try {
      await api.delete("/api/bookings/byId/" + bookingId);
    } catch (err) {

    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setTimeout(() => {
      const getBookings = async () => {
        try {
          if (user.id != null) {
            const response = await api.get("api/bookings/byUserId/" + user.id);
            setBookings(response.data);
            console.log(bookings);
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
      getBookings();
      setLoading(false);
    }, 1000)
  }, [user, bookings])


  return (
    <div className="screenings">
      <h1>Your bookings</h1>
      <div className='not-found'></div>
      {loading ? <div className="loader"> </div> : <div>
        <div className="booking-list movie-list">
          {bookings.map((booking) => (
            <div className="movie-item" key={booking.id}>
              <div className="flex-bookings">
                {booking.screening.movie.poster && <img src={booking.screening.movie.poster} alt={booking.screening.movie.title} />}
                <div className="details-bookings">
                  <p>Movie: <Link to={"/movies/" + `${booking.screening.movie.id}`}>{booking.screening.movie.title}</Link></p>
                  <p>Movie Hall: {booking.screening.movieHall.name}</p>
                  <p>Number of seats: {booking.numOfSeats}</p>
                  <p>Date: {booking.screening.date}</p>
                  <p>Time: {formatTime(booking.screening.time)}</p>
                  <p>Created on: {formatDate(booking.createdOn)}</p>
                </div>
                <button className='button-85' style={{ alignSelf: 'flex-end' }} onClick={(e) => handleDelete(e, booking.id)}>Delete booking</button>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default MyBookings;