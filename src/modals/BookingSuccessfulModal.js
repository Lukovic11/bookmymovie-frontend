import { Link } from "react-router-dom";

const BookingSuccessfulModal = ({ isOpen, onClose }) => {

  if (!isOpen) return null;
  return (  
    <div className="modal-custom" >
    <div className="modal-content-custom-login">
      <div className="par">
        <p style={{ fontWeight: 200, fontSize:"20px" }}>
          Booking successful! <br />
          See your bookings <Link to="/my-bookings">here.</Link>
        </p>
      </div>
      <div className="footer-modal-login">
        <p onClick={onClose}>close</p>
      </div>
    </div>
  </div>
  );
}

export default BookingSuccessfulModal;