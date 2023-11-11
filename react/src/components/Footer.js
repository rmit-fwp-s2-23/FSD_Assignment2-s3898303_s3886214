/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Footer.js */

import React from "react";

// Define a functional component named "Footer" using React.
export default function Footer() {
  // Define inline styles for the footer and its elements.
  const footerStyle = {
    backgroundColor: '#343a40', // Background color of the footer
    padding: '20px 0', // Padding for the footer
    color: 'white', // Text color
  };

  const footerContentStyle = {
    display: 'flex', // Display the content as a flex container
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  };

  const footerTitleStyle = {
    marginBottom: '10px', // Add margin below the title
  };

  const contactListStyle = {
    listStyleType: 'none', // Remove list bullets
    padding: 0, // Remove default padding for the list
    display: 'flex', // Display the list items in a row
    gap: '10px', // Add spacing between list items
  };

  const contactLinkStyle = {
    color: 'white', // Set link text color
    textDecoration: 'none', // Remove underline from links
    transition: 'color 0.3s ease', // Add a color transition effect on hover
  };

  const footerInfoStyle = {
    marginTop: '10px', // Add margin at the top of the footer info
    fontSize: '12px', // Set the font size for footer info
    textAlign: 'center', // Center-align the text
  };

  // Render the footer component with the defined styles.
  return (
    <footer style={footerStyle}>
      <div style={footerContentStyle}>
        <h2 style={footerTitleStyle}>Contact Us</h2> {/* Title */}
        <ul style={contactListStyle}>
          <li><a href="#" style={contactLinkStyle}>Email</a></li> {/* List item for Email */}
          <li><a href="#" style={contactLinkStyle}>Phone</a></li> {/* List item for Phone */}
          <li><a href="#" style={contactLinkStyle}>Address</a></li> {/* List item for Address */}
        </ul>
      </div>
    </footer>
  );
}
