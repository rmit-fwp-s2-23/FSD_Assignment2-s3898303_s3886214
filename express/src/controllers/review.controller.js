/*Kaiyan (s3898303), Moosa (s3898303)*/
/*review.controller.js */
const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  try {
    // Fetch all reviews from the database using Sequelize's findAll method.
    const review = await db.review.findAll();
    res.json(review);
  } catch (err) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: "An error occurred while fetching reviews.", error: err.message });
  }
};

// Create a review in the database.
exports.create = async (req, res) => {
  try {
    // Ensure you validate the rating value before saving to the database.
    // For instance, ensure it's an integer and within a specific range (e.g., 1-5).
    const review = await db.review.create({
      text: req.body.text,
      email: req.body.email,
      rating: req.body.rating,
      movie: req.body.movie
    });
    // Respond with a 201 status code indicating successful creation.
    res.status(201).json(review);
  } catch (err) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: "An error occurred while creating the review.", error: err.message });
  }
};

// Update a review in the database.
exports.update = async (req, res) => {
  try {
    const reviewId = req.params.id; // Assuming you're passing the review ID in the route as a parameter.

    // Find the review by its ID using Sequelize's findByPk method.
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      // If the review is not found, return a 404 status code and a message.
      return res.status(404).json({ message: "Review not found." });
    }

    // Update the review fields with the data from the request body.
    review.text = req.body.text;
    review.rating = req.body.rating;
    review.movie = req.body.movie;
    
    // Save the updated review to the database.
    await review.save();

    res.json({ message: "Review updated successfully.", review: review });
  } catch (err) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: "An error occurred while updating the review.", error: err.message });
  }
};

// Delete a review from the database.
exports.delete = async (req, res) => {
  try {
    const reviewId = req.params.id; // Assuming you're passing the review ID in the route as a parameter.

    // Find the review by its ID using Sequelize's findByPk method.
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      // If the review is not found, return a 404 status code and a message.
      return res.status(404).json({ message: "Review not found." });
    }

    // Delete the review using Sequelize's destroy method.
    await review.destroy();

    res.json({ message: "Review deleted successfully." });
  } catch (err) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: "An error occurred while deleting the review.", error: err.message });
  }
};

// Delete all reviews for a specific user from the database.
exports.deleteByUserEmail = async (req, res) => {
  const email = req.params.email;

  try {
    // Delete all reviews for the specified user using Sequelize's destroy method and a where clause.
    await db.review.destroy({ where: { email } });
    
    res.json({ message: "All reviews for the user deleted successfully." });
  } catch (err) {
    // Handle any errors that occur during the database operation.
    res.status(500).json({ message: "An error occurred while deleting the reviews for the user.", error: err.message });
  }
};
