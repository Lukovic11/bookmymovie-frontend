import { useEffect, useState } from "react";
import api from "../Api.js";

const SeatingChart = ({ screening }) => {
  const [seats, setSeats] = useState([]);
  let row = 0;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await api.get(`/api/seats/byMovieHall/${screening.movieHall.id}`);
        setSeats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSeats();
  }, [screening]);

  const handleSeatClick = (rowNumber, seatId) => {
    console.log(`Seat clicked: Row ${rowNumber}, Seat ID ${seatId}`);
  };

  const handleSquareClick = (event) => {
    event.target.classList.toggle('square-clicked');
  };



  return (
    <div className="seating-chart">
      {seats.map((seat) => {
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
            <div className="rowNumberIndicator" style={{ display: 'inline-block', width:"25px"}}>
              {seat.seatNumber === 1 && row}
            </div>
            <div
              className="seat"
              onClick={() => handleSeatClick(seat.rowNumber, seat.id)}
              style={{ display: 'inline-block' }}
              key={seat.id}
            >
              <div className="square" onClick={handleSquareClick}>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SeatingChart;
