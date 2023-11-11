/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Navbar.js */

import React from "react";
import { Link } from "react-router-dom";

// Create and export a functional component named "Navbar" that receives props.
export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Loop Web</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {props.user !== null &&
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/movies">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/forum">Reviews</Link>
                </li>
              </>
            }
          </ul>
          <ul className="navbar-nav">
            {props.user === null ?
              <>
               <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">SignUp</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">SignIn</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Movies">Movies</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Welcome, {props.user.name}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={props.logoutUser}>Logout</Link>
                </li>
              </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
