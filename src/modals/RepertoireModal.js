import { Link } from "react-router-dom";

const RepertoireModal = ({message, isOpen, onClose }) => {

  if (!isOpen) return null;
  return (
    <div className="modal-custom" >
      <div className="modal-content-custom-login">
        <div className="par">
          <p style={{ fontWeight: 200, fontSize: "20px" }}>
            {message}
          </p>
        </div>
        <div className="footer-modal-login">
          {!(message==="Hold on...")&&<p onClick={onClose}>close</p>}
        </div>
      </div>
    </div>
  );
}
 
export default RepertoireModal;