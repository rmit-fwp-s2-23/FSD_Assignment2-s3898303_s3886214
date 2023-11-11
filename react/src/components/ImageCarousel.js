/*Kaiyan (s3898303), Moosa (s3898303)*/
/* ImageCarousel.js */

import React from 'react';
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Apply the carousel's CSS styles
import '../style/ImageCarousel.css'; // Import the component-specific CSS styles

const ImageCarousel = () => {
  // Movie data with titles, images, and descriptions
  const movies = [
    {
      title: 'The Revenge of Spiderman',
      image: require('../assets/Spider.jpg'),
      description: 'In Theatres 17th of November 2023',
    },
    {
      title: 'Fire Wrecks a Forrest',
      image: require('../assets/Fire.jpg'),
      description: 'In Theatres 19th of November 2023',
    },
    {
      title: 'Love the Classic Way',
      image: require('../assets/Love.jpg'),
      description: 'In Theatres 21th of November 2023',
    },
  ];

  return (
    <div className="image-carousel-container"> {/* Container for the entire image carousel */}
      <Carousel
        showThumbs={false} // Hide thumbnail images
        showStatus={false} // Hide the status indicator
        autoPlay={true} // Automatically advance to the next slide
        infiniteLoop={true} // Enable infinite loop for the carousel
        interval={2500} // Time (in milliseconds) for each slide
        transitionTime={500} // Duration (in milliseconds) of slide transitions
        emulateTouch={true} // Emulate touch interactions
        swipeable={true} // Enable swipe gestures
      >
        {movies.map((movie, index) => ( // Loop through the movie data and create carousel items
          <div key={index} className="carousel-item"> {/* Each individual carousel item */}
            {/* Display movie image with alt text as the movie title */}
            <img src={movie.image} alt={movie.title} />

            <div className="movie-details"> {/* Container for movie details */}
              {/* Display movie title with special styling */}
              <h3 className="movie-title">{movie.title}</h3>
              
              {/* Display movie description */}
              <p className="movie-description">{movie.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
