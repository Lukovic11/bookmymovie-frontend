const Success = ({ message, onClose }) => {
  return (
    <div className="modal-custom">
      <div className="modal-content-custom-login">
        <p>{message}</p>
        <div className="footer-modal-login">
          {<p onClick={onClose}>close</p>}
        </div>
      </div>
    </div>
  );
};

export default Success;
