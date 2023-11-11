/*Kaiyan (s3898303), Moosa (s3898303)*/
/* user.controller.js */

const db = require("../database"); // Import the database module
const argon2 = require("argon2"); // Import Argon2 for password hashing

// Function to retrieve all users from the database
exports.all = async (req, res) => {
  const users = await db.user.findAll(); // Fetch all users from the database
  res.json(users); // Respond with a JSON array containing user data
};

// Function to retrieve a single user by ID
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id); // Find a user by their ID
  res.json(user); // Respond with a JSON object containing the user's information
};

// Function to handle user login
exports.login = async (req, res) => {
  const user = await db.user.findOne({
    where: { email: req.body.email } // Find a user by their email
  });
  
  if (!user || !(await argon2.verify(user.password_hash, req.body.password))) {
    // If no user is found or the password doesn't match, respond with null
    res.json(null);
  } else {
    res.json(user); // Respond with the user's information if login is successful
  }
};

// Function to create a new user
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  // Hash the provided password securely

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash, // Store the hashed password in the database
    name: req.body.name
  });

  res.json(user); // Respond with the newly created user's information
}

// Function to update user information
exports.update = async (req, res) => {
  const email = req.params.email; // Get the email from the request parameters

  const userToUpdate = {
    name: req.body.name // Get the new name from the request body
  };

  try {
    const user = await db.user.findOne({ where: { email } });
    // Find the user to update based on their email
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
      // Respond with a 404 status and a message if the user is not found
    }
    await user.update(userToUpdate); // Update the user's information
    res.json({ message: "User updated successfully." });
    // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: "Error updating the user." });
    // Respond with a 500 status and an error message if an error occurs
  }
};

// Function to delete a user account
exports.delete = async (req, res) => {
  const email = req.params.email; // Get the email from the request parameters
  
  try {
    const user = await db.user.findOne({ where: { email } });
    // Find the user to delete based on their email
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
      // Respond with a 404 status and a message if the user is not found
    }
    await user.destroy(); // Delete the user from the database
    res.json({ message: "User deleted successfully." });
    // Respond with a success message
  } catch (error) {
    res.status(500).json({ message: "Error deleting the user." });
    // Respond with a 500 status and an error message if an error occurs
  }
};
