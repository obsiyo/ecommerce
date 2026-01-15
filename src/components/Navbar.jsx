import { Link } from "react-router-dom";

export default function Navbar(){
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = ()=>{
    localStorage.clear();
    window.location.href="/login";
  };

  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mini Store</Link>

        <div>
          <Link className="btn btn-outline-light me-2" to="/cart">Cart</Link>

          {user ? (
            <button className="btn btn-danger" onClick={logout}>Logout</button>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-warning" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
