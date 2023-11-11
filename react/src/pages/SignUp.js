/*Kaiyan (s3898303), Moosa (s3898303)*/
/* SignUp.js */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser } from "../data/repository"; // Import a function for user registration
import '../style/SignUp.css'; // Import the CSS file for SignUp component
import '../style/Website.css'; // Import the global CSS file

// Create and export a functional component named "SignUp" that receives props.
export default function SignUp(props) {
  const navigate = useNavigate(); // React Router's navigation function for page redirection
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Generic change handler to update state with input values.
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  // Function to handle form submission (Sign Up)
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and, if invalid, do not contact the API.
    const { trimmedFields, isValid } = await handleValidation();
    if (!isValid) return;

    // Create a new user using the provided registration function.
    const user = await createUser(trimmedFields);

    // Set user state via the props passed to the component (likely for application-wide user management).
    props.loginUser(user);

    // Navigate to the home page.
    navigate("/");
  };

  // Function to validate form fields and display error messages.
  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = {};

    // Name validation
    let key = "name";
    let field = trimmedFields[key];
    if (field.length === 0) currentErrors[key] = "Name is required.";
    else if (field.length > 40) currentErrors[key] = "Name length cannot be greater than 40.";

    // Email validation
    key = "email";
    field = trimmedFields[key];
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (field.length === 0) currentErrors[key] = "Email is required.";
    else if (field.length > 100) currentErrors[key] = "Email length cannot be greater than 100.";
    else if (!emailRegex.test(field)) currentErrors[key] = "Please enter a valid email address.";

    // Password validation
    key = "password";
    field = trimmedFields[key];
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (field.length === 0) currentErrors[key] = "Password is required.";
    else if (!strongPasswordRegex.test(field)) {
      currentErrors[key] = "Password must be at least 8 characters and include at least one lowercase letter, one uppercase letter, one digit, and one special character.";
    }

    // Confirm password validation
    if (field !== confirmPassword) currentErrors["confirmPassword"] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  // Function to check if an email address is in a valid format.
  const isValidEmail = (email) => {
    // You can use a regular expression to validate email format.
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to trim white spaces from form fields.
  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).forEach((key) => {
      trimmedFields[key] = fields[key].trim();
    });
    return trimmedFields;
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>SignUp</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="control-label">
              Name
            </label>
            <input
              name="name"
              id="name"
              className="form-control"
              value={fields.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
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
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="control-label">
              Password
              <small className="text-muted">must be at least 8 characters</small>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              value={fields.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>
          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="control-label">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>
          {/* SignUp & Cancel Buttons */}
          <div className="form-group">
            <input type="submit" className="signup-button" value="SignUp" />
            <Link className="cancel-button" to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
