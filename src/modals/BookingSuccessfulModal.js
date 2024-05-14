import { Link } from "react-router-dom";

const BookingSuccessfulModal = ({ isOpen, onClose, updated }) => {

  if (!isOpen) return null;
  return (
    <div className="modal-custom" >
      <div className="modal-content-custom-login">
        <div className="par">
          {updated && <p style={{ fontWeight: 200, fontSize: "20px" }}>
            Booking successful! <br />
            See your bookings <Link to="/my-bookings">here.</Link>
          </p>}
          {!updated && <p style={{ fontWeight: 200, fontSize: "20px" }}>
            Hold on...
          </p>}
        </div>
        <div className="footer-modal-login">
          {updated && <p onClick={onClose}>close</p>}
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessfulModal;