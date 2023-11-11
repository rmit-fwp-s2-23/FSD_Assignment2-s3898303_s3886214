/*Kaiyan (s3898303), Moosa (s3898303)*/
/* user.routes.js */

// routes/user.routes.js

module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Select one user from the database if email and password are a match.
  router.post("/login", controller.login); // Use POST method for login

  // Create a new user.
  router.post("/", controller.create);

  // Update user based on email.
  router.put("/update/:email", controller.update);

  // Delete user based on email.
  router.delete("/delete/:email", controller.delete);

  // Add routes to server.
  app.use("/api/users", router);

};