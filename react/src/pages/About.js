/*Kaiyan (s3898303), Moosa (s3898303)*/
/* About.js */
// Import React library for creating components
import React from 'react';

// Import the associated CSS file for styling
import '../style/About.css';

// Create a functional component named About
function About() {
  return (
    // Create a container div with the class 'about-container'
    <div className="about-container">
      <div className="about-content">
        {/* Display the main heading */}
        <h1>Welcome to Loop Web</h1>

        {/* Display a paragraph describing Loop Web */}
        <p className="about-description">
          At Loop Web, we're passionate about bringing the magic of cinema to your screens.
          As your ultimate destination for the latest movies, we offer an unparalleled
          cinematic experience that keeps you engaged and entertained.
        </p>

        {/* Display a subheading */}
        <h2>Our Mission</h2>

        {/* Display a paragraph describing Loop Web's mission */}
        <p className="about-description">
          Our mission is to connect movie enthusiasts with the most exciting films from around the world.
          Whether you're a fan of action, drama, romance, or fantasy, Loop Web is your go-to platform
          for discovering and enjoying the latest blockbusters and hidden gems.
        </p>

        {/* Display another subheading */}
        <h2>Why Choose Loop Web?</h2>

        {/* Display a paragraph listing reasons to choose Loop Web */}
        <p className="about-description">
          - Extensive Movie Collection: We curate a diverse selection of movies, ensuring there's something
          for every taste and preference.
          <br />
          - Seamless Experience: Our user-friendly interface makes browsing, selecting, and watching movies a breeze.
          <br />
          - High-Quality Streaming: Enjoy crisp, high-definition streaming that brings the cinematic experience to your home.
          <br />
          - Exclusive Content: Get access to exclusive content, behind-the-scenes features, and interviews with filmmakers.
          <br />
          - Community Engagement: Join a community of fellow movie lovers, discuss your favorite films, and share recommendations.
        </p>

        {/* Display one more subheading */}
        <h2>Contact Us</h2>

        {/* Display a paragraph with contact information */}
        <p className="about-description">
          Have questions, suggestions, or feedback? Reach out to us at contact@loopweb.com.
          We're here to make your movie-watching experience extraordinary.
        </p>
      </div>
    </div>
  );
}

// Export the About component to be used in other parts of the application
export default About;
