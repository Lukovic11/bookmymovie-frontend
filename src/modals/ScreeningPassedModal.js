const ScreeningPassedModal = ({ isOpen, onClose }) => {


  
  if (!isOpen) return null;
  return (  
    <div className="modal-custom" >
    <div className="modal-content-custom-login">
      <div className="par">
        <p style={{ fontWeight: 200, fontSize:"20px" }}>
          You cannot book tickets for this screening anymore. Sorry!
        </p>
      </div>
      <div className="footer-modal-login">
        <p onClick={onClose}>close</p>
      </div>
    </div>
  </div>
  );
}
 
export default ScreeningPassedModal;