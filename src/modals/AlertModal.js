const Alert = ({message}) => {
  return (
     <div className="alert-overlay">
      <div className="alert">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Alert