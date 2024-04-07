import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return (
      <div className="not-found">
        <h2>That page cannot be found</h2>
        <Link to="/">Back to the homepage...</Link>
      </div>
  );
}

export default NotFound;