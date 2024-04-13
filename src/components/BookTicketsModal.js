import { useEffect, useState } from "react";
import api from "../Api.js";

const BookTicketsModal = ({ isOpen, onClose, id }) => {
  const[screenings,setScreenings]=useState([]);
  const today = new Date();
  const dateOnly = today.toISOString().split('T')[0];

  useEffect(()=>{
    const getScreenings=async()=>{
      try {
        console.log(id);
        const response=await api.get("/api/screenings/"+dateOnly+"/"+id);
        console.log(response.data);
        const allScreenings=response.data;
        setScreenings(allScreenings.filter(screenings=>screenings.movie.id===id))
      } catch (error) {
        
      }
    }
    console.log(screenings);
    getScreenings();
  },[])

  if (!isOpen)  return null;
  return (
    <div className="modal">
    <div className="modal-content">
      <div className="header-modal">
      <h2>Book tickets</h2>
      <span className="close" onClick={onClose}>&times;</span>
      </div>

    </div>
  </div>
    );
}

export default BookTicketsModal;