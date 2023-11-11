/*Kaiyan (s3898303), Moosa (s3898303)*/
/* App.js */

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Movies from "./pages/Movies";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyProfile from "./pages/MyProfile";
import Reviews from "./pages/Reviews";
import { getUser, removeUser } from "./data/repository";

export default function App() {
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header /> {/* Add the Header component */}
        <Navbar user={user} logoutUser={logoutUser} />
        <main role="main">
          <div className="container my-3">
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/about" element={<About user={user} />} />
              <Route path="/movies" element={<Movies loginUser={loginUser} />} />
              <Route path="/login" element={<SignIn loginUser={loginUser} />} />
              <Route path="/register" element={<SignUp loginUser={loginUser} />} />
              <Route path="/profile" element={<MyProfile user={user} logoutUser={logoutUser} />} /> {/* Pass logoutUser as a prop */}
              <Route path="/forum" element={<Reviews user={user} />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
