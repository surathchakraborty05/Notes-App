import React,{useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";



const Navbar = () => {
  const navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
  let location = useLocation();
  useEffect(() =>{
  console.log(location.pathname)
},[location]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">INotebook</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
            </li>
          </ul>

          </div>
          {!localStorage.getItem('token')?<form className="me-4 d-flex">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUP</Link>
          </form>:<Link onClick={handlelogout} className="btn btn-primary mx-2" to="/login" role="button">Logout</Link>}
      </div>
    </nav>
  )
}

export default Navbar