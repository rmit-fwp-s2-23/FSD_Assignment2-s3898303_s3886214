/*Kaiyan (s3898303), Moosa (s3898303)*/
/* SignIn.js */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../data/repository";

export default function SignIn(props) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Attempt to verify the user's credentials using the repository.
    const user = await verifyUser(fields.email, fields.password);

    if (user === null) {
      // Login failed, reset password field to blank and set an error message.
      setFields({ ...fields, email: "", password: "" });
      setErrorMessage("Email and/or password invalid, please try again.");
      return;
    }

    // Set user state by invoking the `loginUser` function passed as a prop.
    props.loginUser(user);

    // Navigate to the home page after successful login.
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>SignIn</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="control-label">
              Email
            </label>
            <input
              name="email"
              id="email"
              className="form-control"
              value={fields.email}
              onChange={handleInputChange}
            />
          </div>
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="control-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={fields.password}
              onChange={handleInputChange}
            />
          </div>
          {/* SignIn Button */}
          <div className="form-group">
            <input type="submit" className="signup-button" value="SignIn" />
          </div>
          {errorMessage !== null && (
            <div className="form-group">
              <span className="text-danger">{errorMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
