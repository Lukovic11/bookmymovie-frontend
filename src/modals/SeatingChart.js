import { useEffect, useState } from "react";
import api from "../Api.js";

const SeatingChart = ({ screening, onSeatsSelected }) => {
  const [seats, setSeats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [disabledSeats, setDisabledSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isMaxSelected,setIsMaxSelected]=useState(false);
  let row = 0;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await api.get(`/api/seats/byMovieHall/${screening.movieHall.id}`);
        setSeats(response.data);
        const bookingList = await api.get('/api/bookings/byScreeningId/' + screening.id);
        setBookings(bookingList.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchSeats();
  }, [screening]);

  useEffect(() => {
    const fetchDisabledSeats = async () => {
      try {
        const fetchedDisabledSeats = [];
        const bookedSeatsPromises = bookings.map(async (booking) => {
          const bookedSeats = await api.get('api/bookedSeats/byBookingId/' + booking.id);
          const bookedSeatsData = bookedSeats.data;

          bookedSeatsData.forEach(bookedSeat => {
            fetchedDisabledSeats.push(bookedSeat.seatId);
          });
        })
        await Promise.all(bookedSeatsPromises);

        setDisabledSeats(fetchedDisabledSeats);
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
    fetchDisabledSeats();
  }, [bookings])


  const handleSeatClick = (isSeatDisabled,rowNumber, seatId) => {
    const isSeatSelected = selectedSeats.includes(seatId);
    if(isMaxSelected && !isSeatSelected){
      return;
    }
    if(isSeatDisabled){
      return;
    }
    const updatedSelectedSeats = [...selectedSeats];
    const seatIndex = updatedSelectedSeats.indexOf(seatId);

    if (seatIndex !== -1) {
      updatedSelectedSeats.splice(seatIndex, 1);
    } else {
      updatedSelectedSeats.push(seatId);
    }
    if(updatedSelectedSeats.length===6){
      setIsMaxSelected(true);
    }else{
      setIsMaxSelected(false);
    }

    setSelectedSeats(updatedSelectedSeats);

    onSeatsSelected(updatedSelectedSeats);
  };

  const handleSquareClick = (event,seatId) => {
    const isSeatSelected = selectedSeats.includes(seatId);
    if(isMaxSelected && !isSeatSelected){
      return;
    }
    event.target.classList.toggle('square-clicked');
  };



  return (
    <div className="seating-chart">
    {disabledSeats.length===seats.length && <p>Sorry, there are no seats <br />left for this screening</p>}
    {isMaxSelected && <p>Max number of tickets is 6!</p>}
      {seats.map((seat) => {
        const isSeatDisabled = disabledSeats.includes(seat.id);
        const seatClassName = isSeatDisabled ? "seat-disabled" : "seat";
      let rowSeparator = null;

        if (seat.seatNumber === 1) {
          { row++ };
          rowSeparator = (
            <div
              key={`separator-${seat.id}`}
              style={{ display: 'block' }}
              className="separator"
            >
            </div>
          );
        }


        return (
          <>
            {rowSeparator}
            <div className="rowNumberIndicator" style={{ display: 'inline-block', width: "25px" }}>
              {seat.seatNumber === 1 && row}
            </div>
            <div
              className={seatClassName}
              onClick={() => handleSeatClick(isSeatDisabled,seat.rowNumber, seat.id)}
              style={{ display: 'inline-block' }}
              key={seat.id}
            >
             {!isSeatDisabled && <div className="square" onClick={(e) => handleSquareClick(e,seat.id)}>
              </div>
              }
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SeatingChart;
