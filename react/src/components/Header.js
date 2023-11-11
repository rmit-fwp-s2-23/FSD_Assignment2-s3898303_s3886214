/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Header.js */

import React from 'react';
import logoImage from '../assets/Logo.png'; // Import the logo image
import '../style/Header.css'; // Import the CSS file for styling

// Define a functional component named "Header."
function Header() {
  // Render the header element with the logo and site title.
  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="Loop Movies Logo" /> {/* Display the logo image with alt text */}
        <h1>Loop Web</h1> {/* Display the site title */}
      </div>
    </header>
  );
}

export default Header; // Export the "Header" component for use in other parts of the application.
