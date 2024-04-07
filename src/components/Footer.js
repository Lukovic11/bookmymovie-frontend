import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer=()=>{
  return(
      <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-7">
        <p className="col-md-4 mb-0">© 2024 Book My Movie, Inc</p>

        <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        </a>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item"><Link to="/" className="nav-link px-2 ">Home</Link></li>
          <li className="nav-item"><Link to="/movies" className="nav-link px-2 ">Movies</Link></li>
          <li className="nav-item"><Link to="/coming-soon" className="nav-link px-2 ">Coming soon</Link></li>
        </ul>
      </footer>
  )
}

export default Footer;