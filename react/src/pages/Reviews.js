/*Kaiyan (s3898303), Moosa (s3898303)*/
/* Reviews.js */

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../style/Reviews.css';
import { getReviews, createReview, editReview, deleteReview } from "../data/repository";
import { movies } from './Home';
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

export default function Reviews(props) {
  // State variables for managing reviews and user input
  const [review, setReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [rating, setRating] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  // Use an effect to load reviews when the component mounts
  useEffect(() => {
    async function loadReviews() {
      const currentReviews = await getReviews();
      setReviews(currentReviews);
      setIsLoading(false);
    }
    loadReviews();
  }, []);

  // Function to reset review-related input fields and error message
  const resetReviewContent = () => {
    setReview("");
    setErrorMessage(null);
    setEditingReviewId(null);
  };

  // Function to handle editing of a review
  const handleEdit = (reviewId, reviewText, reviewEmail) => {
    if (props.user.email === reviewEmail) {
      setEditingReviewId(reviewId);
      setReview(reviewText);
    } else {
      alert("You can only edit your own reviews.");
    }
  };

  // Function to save an edited review
  const handleSaveEdit = async () => {
    if (editingReviewId) {
      const updatedReview = await editReview(editingReviewId, { text: review });
      const newReviewData = {
        ...updatedReview,
        text: review
      };
      const updatedReviews = reviews.map(r => r.review_id === editingReviewId ? newReviewData : r);
      setReviews(updatedReviews);
      resetReviewContent();
    }
  };

  // Function to calculate the average rating for a movie
  const calculateAverageRating = (movieTitle) => {
    const movieReviews = reviews.filter(review => review.movie === movieTitle);
    const totalRating = movieReviews.reduce((sum, review) => sum + parseInt(review.rating, 10), 0);
    const averageRating = movieReviews.length > 0 ? (totalRating / movieReviews.length).toFixed(1) : 0;
    return averageRating;
  };

  // Function to handle deleting a review
  const handleDelete = async (reviewId, reviewEmail) => {
    if (props.user.email === reviewEmail) {
      await deleteReview(reviewId);
      const updatedReviews = reviews.filter(r => r.review_id !== reviewId);
      setReviews(updatedReviews);
    } else {
      alert("You can only delete your own reviews.");
    }
  };

  // Function to handle review submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the review is not empty
    if (review.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setErrorMessage("A review cannot be empty.");
      return;
    }

    if (editingReviewId) {
      handleSaveEdit();
    } else {
      // Create a new review object
      const newReview = {
        text: review,
        email: props.user.email,
        movie: selectedMovie,
        rating: rating
      };

      // Call the createReview function and update the review list
      await createReview(newReview);
      setReviews([...reviews, newReview]);
      resetReviewContent();
    }
  };

  // Return the review component UI
  return (
    <div className="review-container">
      <h2>Leave a Review</h2>
      {props.user ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="selectedMovie">Select Movie:</label>
            <select
              id="selectedMovie"
              name="selectedMovie"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              required
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.title} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="">Select Rating</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reviewText">Review:</label>
            <ReactQuill
              value={review}
              onChange={setReview}
            />
          </div>
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>Please sign in to leave a review.</p>
      )}

      {/* Display reviews and average ratings */}
      <div className="review-list">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.review_id} className="review-item">
            {editingReviewId === review.review_id ? (
              <EditReviewForm
                review={review}
                onSave={(editedReview) => handleSaveEdit(editedReview)}
              />
            ) : (
              <ReviewItem
                review={review}
                onEdit={() => handleEdit(review.review_id, review.text, review.email)}
                onDelete={() => handleDelete(review.review_id, review.email)}
                loggedInUserEmail={props.user.email}
              />
            )}
          </div>
        ))}
      </div>

      <div className="movie-ratings">
        <h2>Movie Ratings</h2>
        {movies.map((movie) => (
          <div key={movie.title} className="movie-rating-item">
            <h3>{movie.title}</h3>
            <p>Average Rating: {calculateAverageRating(movie.title)}</p>
            <img src={movieImages[movie.title]} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component to display a review item
function ReviewItem({ review, onEdit, onDelete, loggedInUserEmail }) {
  const canEditDelete = loggedInUserEmail === review.email;
  return (
    <div>
      <p>Username: {review.username}</p>
      <p>Email: {review.email}</p>
      <p>Rating: {review.rating}</p>
      <div>
        Review:
        <div dangerouslySetInnerHTML={{ __html: review.text }} />
      </div>
      <p>Movie: {review.movie}</p>
      {canEditDelete && (
        <div>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

// Sub-component to display an edit review form
function EditReviewForm({ review, onSave }) {
  const [editedReview, setEditedReview] = useState({
    review_id: review.review_id,
    text: review.text,
    email: review.email,
    movie: review.movie,
    rating: review.rating
  });

  // Function to handle changes in the edit review form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedReview(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <label htmlFor="rating">Rating:</label>
      <select
        id="rating"
        name="rating"
        value={editedReview.rating}
        onChange={handleChange}
        required
      >
        <option value="">Select Rating</option>
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
      <label htmlFor="reviewText">Review: </label>
      <ReactQuill
        value={editedReview.text}
        onChange={(val) => setEditedReview(prev => ({ ...prev, text: val }))}
      />
      <button onClick={() => onSave()}>Save</button>
    </div>
  );
}
