/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Movies.js */

import React, { useState } from 'react';
import '../style/Movies.css';

import SpiderImage from '../assets/Spider.jpg';
import FireImage from '../assets/Fire.jpg';
import LoveImage from '../assets/Love.jpg';

// Define images for different movies
const movieImages = {
  'The Revenge of Spiderman': SpiderImage,
  'Fire Wrecks a Forrest': FireImage,
  'Love the Classic Way': LoveImage,
  // Add more movie images as needed
};

const Movies = () => {
  // Initialize the component state with movie data
  const [movies] = useState([
    {
      id: 1,
      title: 'The Revenge of Spiderman',
      description: 'In "The Revenge of Spiderman," our friendly neighborhood superhero...',
      availableSeats: 10, // Total available seats for this movie
      reservedSeats: 0, // Initially, no seats are reserved
    },
    {
      id: 2,
      title: 'Fire Wrecks a Forrest',
      description: 'In "Fire Wrecks a Forrest," a peaceful forest community finds itself...',
      availableSeats: 10,
      reservedSeats: 0,
    },
    {
      id: 3,
      title: 'Love the Classic Way',
      description: 'Get ready for a heartwarming journey in "Love the Classic Way."...',
      availableSeats: 10,
      reservedSeats: 0,
    },
    // Add more movie objects here
  ]);

  // Function to reserve a seat for a movie
  const reserveSeat = (movieId) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId && movie.reservedSeats < movie.availableSeats) {
        return { ...movie, reservedSeats: movie.reservedSeats + 1 };
      }
      return movie;
    });
    // Update the state with the new reserved seat count (Note: the code for state update is missing)
  };

  return (
    <div>
      <h2>Movie List</h2>
      {movies.map((movie) => (
        <div key={movie.id} className="movie">
          <h3>{movie.title}</h3>
          <img src={movieImages[movie.title]} alt={movie.title} />
          <p>{movie.description}</p>
          <p>
            Available Seats: {movie.availableSeats - movie.reservedSeats} / {movie.availableSeats}
          </p>
          {movie.reservedSeats < movie.availableSeats ? (
            <button onClick={() => reserveSeat(movie.id)}>Reserve a Seat</button>
          ) : (
            <p>Session Sold Out</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;
