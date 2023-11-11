/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Home.js */
// Import React library and the associated components and CSS file
import React from 'react';
import ImageCarousel from '../components/ImageCarousel';
import '../style/Home.css'; // Import your CSS file
import movieImage from '../assets/Spider.jpg'; // Import movie image

export const movies = [ // Export the movies array
  {
    title: 'The Revenge of Spiderman',
    image: require('../assets/Spider.jpg'), // Import and assign movie image
  },
  {
    title: 'Fire Wrecks a Forrest',
    image: require('../assets/Fire.jpg'), // Import and assign movie image
  },
  {
    title: 'Love the Classic Way',
    image: require('../assets/Love.jpg'), // Import and assign movie image
  },
  // Add more movie objects as needed
];

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Discover the Magic of Cinema</h1>
        <p className="hero-subtitle">
          Explore the Latest Blockbusters and Unforgettable Classics.
        </p>
        <p className="hero-subtitle">
          Experience the World of Movies Like Never Before!
        </p>
      </div>
      <ImageCarousel
        header="Now Playing"
        images={[movieImage, movieImage, movieImage]}
        content="Experience the excitement of the big screen with our latest movie releases. From thrilling action-packed adventures to heartwarming dramas, we have a movie for every mood."
      />
    </div>
  );
}
