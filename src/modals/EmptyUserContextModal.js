import { Link } from "react-router-dom";

const EmptyUserContextModal = ({ isOpen, onClose }) => {

  if (!isOpen) return null;
  return (
    <div className="modal-custom" >
      <div className="modal-content-custom-login">
        <div className="par">
          <p style={{ fontWeight: 500 }}><Link to={"/login"}>Log in</Link> or <Link to={"/signup"}>create account</Link> <br />to book tickets!</p>
        </div>
        <div className="footer-modal-login">
          <p onClick={onClose}>close</p>
        </div>
      </div>
    </div>
  )
}

export default EmptyUserContextModal;