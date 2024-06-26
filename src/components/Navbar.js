import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.js";


const Navbar = () => {
  const { user, resetUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    resetUser();
  }

  return (
    <header className="p-3" data-bs-theme="dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            {user.role === "admin" ? (
              <>
                <li><Link to="/" className="nav-link px-3">HOME</Link></li>
                <li><Link to="/users" className="nav-link px-3">USERS</Link></li>
                <li><Link to="/screenings" className="nav-link px-3">REPERTOIRE</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" className="nav-link px-3">HOME</Link></li>
                <li><Link to="/movies" className="nav-link px-3">MOVIES</Link></li>
                <li><Link to="/coming-soon" className="nav-link px-3">COMING SOON</Link></li>
              </>
            )}
          </ul>

          <div className="text-end">
            {user.id ? (
              <>
                <span className="me-3">Hello, {user.firstname}</span>
                {user.role === "admin" ? (
                  <>
                    <Link to="/add-movie"><button type="button" className="btn me-2">Add movie</button></Link>
                  </>
                ) : (
                  <>
                    <Link to="/my-bookings"><button type="button" className="btn me-2">My Bookings</button></Link>
                  </>
                )}
                <Link to="/"><button type="button" className="btn" onClick={handleLogout}>Logout</button></Link>
              </>
            ) : (
              <>
                <Link to="/login">  <button type="button" className="btn  me-2">LOGIN</button></Link>
                <Link to="/signup"><button type="button" className="btn ">SIGN UP</button></Link>
              </>

            )
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;