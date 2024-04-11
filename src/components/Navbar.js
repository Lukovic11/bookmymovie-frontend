import { Link } from "react-router-dom";

const Navbar = () => {
  return (  
      <header className="p-3" data-bs-theme="dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
              
            </a>
  
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              
              <li><Link to="/"className="nav-link px-3">HOME</Link></li>
              <li><Link to="/movies" className="nav-link px-3">MOVIES</Link></li>
              <li><Link to="/coming-soon" className="nav-link px-3">COMING SOON</Link></li>
            </ul>
  
            <div className="text-end">
            <Link to="/login">  <button type="button" className="btn  me-2">LOGIN</button></Link>
              <Link to="/signup"><button type="button" className="btn ">SIGN UP</button></Link>
            </div>
          </div>
        </div>
      </header>
    );
}
 
export default Navbar;