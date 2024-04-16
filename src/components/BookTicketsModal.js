import { useEffect, useState } from "react";
import api from "../Api.js";

const BookTicketsModal = ({ isOpen, onClose, id }) => {
  const [screening, setScreening] = useState(null);
  const today = new Date();
  const dateOnly = today.toISOString().split('T')[0];
  const [isMenu1Open, setIsMenu1Open] = useState(false);
  const [isMenu2Open, setIsMenu2Open] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);


  const timeSlots = ["15:00", "18:00", "21:00"].map(slot => {
    const [hours, minutes] = slot.split(':');
    const formattedTime = `${hours.padStart(2, '0')}:${minutes}`;
    return formattedTime;
  });

  const toggleDropdown1 = () => {
    setIsMenu1Open(!isMenu1Open);
  };

  const toggleDropdown2 = () => {
    setIsMenu2Open(!isMenu2Open);
  };

  const handleDateClick = (date) => {
    console.log(date);
    const [month, day, year] = date.split('/');
    const formattedDate = `${2024}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    console.log(formattedDate);
    setSelectedDate(formattedDate);
    setIsMenu1Open(false);
  };


  const handleTimeClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsMenu2Open(false);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("/api/screenings/" + selectedDate + "/" + selectedTimeSlot + "/" + id);
      setScreening(response.data);
      bookTickets();
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


  const bookTickets = async () => {

    try {
      if (screening) {
        const bookingData = {
          user:{
            id: 1 
          },
        screening:{
          id: screening.id
        },
          numOfSeats: ticketQuantity,
            createdOn: dateOnly
      };
      console.log(JSON.stringify(bookingData));
      // Send POST request to server
      const response = await api.post('/api/bookings', bookingData);

      // Handle response as needed
      console.log('Booking successful:', response.data);

      // Close the modal after successful booking
      onClose();
    }


    } catch (error) {
    console.error('Error booking tickets:', error);
    // Handle error
  }
};

const getNext7Days = () => {
  const days = [];
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const options = { month: '2-digit', day: '2-digit' }
  const formatter = new Intl.DateTimeFormat('en', options);

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    const dayOfWeek = weekdays[nextDay.getDay()];
    const date = formatter.format(nextDay);
    days.push({ date, dayOfWeek });
  }
  return days;
};

const next7Days = getNext7Days();



if (!isOpen) return null;
return (
  <div className="modal-custom">
    <div className="modal-content-custom">
      <div className="header-modal">
        <h2>Book tickets</h2>
        <span className="close" onClick={onClose}>&times;</span>
      </div>

      {/* DROPDOWN 1 */}

      <div className="dropdown">
        <button className="dropdown-toggle button-85 less-padding" onClick={() => toggleDropdown1()}>
          {selectedDate ? selectedDate : "Choose date..."}
        </button>
        {isMenu1Open && (
          <ul className="border-radius-5 dropdown-menu d-block position-static mx-0 border-0 shadow w-220px">
            {next7Days.map(({ date, dayOfWeek }) => (
              <li key={date}>
                <a className="dropdown-item d-flex gap-2 align-items-center" href="#" onClick={() => handleDateClick(date)}>
                  <span>{dayOfWeek}</span>
                  -
                  <svg className="bi" width="0" height="16"><use xlinkHref="#files"></use></svg>
                  {date}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DROPDOWN 2 */}

      <div className="dropdown">
        <button className="dropdown-toggle button-85 less-padding" onClick={() => toggleDropdown2()}>
          {selectedTimeSlot ? selectedTimeSlot : "Choose time slot..."}
        </button>
        {isMenu2Open && (
          <ul className="border-radius-5 dropdown-menu d-block position-static mx-0 border-0 shadow w-220px">
            {timeSlots.map((timeSlot, index) => (
              <li className="listItemDropdown" key={index}>
                <a className="dropdown-item d-flex gap-2 align-items-center" href="#" onClick={() => handleTimeClick(timeSlot)}>
                  <span>{timeSlot}</span>
                </a>
              </li>
            ))}

          </ul>
        )}
      </div>


      {/* INPUT FOR NUMBER OF TICKETS */}
      <div className="noOfTickets">
        <label htmlFor="ticketQuantity">Number of Tickets: </label>
        <input
          type="number"
          id="ticketQuantity"
          name="ticketQuantity"
          min="1"
          max="6"
          value={ticketQuantity}
          onChange={(e) => setTicketQuantity(e.target.value)}
        />
      </div>

      {/*SUBMIT BUTTON */}
      <div className="bookTickets">
        <button onClick={handleBooking}>
          Book tickets
        </button>
      </div>

    </div>
  </div>
);
}

export default BookTicketsModal;

