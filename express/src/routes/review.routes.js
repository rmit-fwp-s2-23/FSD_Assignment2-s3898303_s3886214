/*Kaiyan (s3898303), Moosa (s3898303)*/
/* review.routes.js */

module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews.
  router.get("/", controller.all);

  // Create a new review.
  router.post("/", controller.create);

  // Update a review.
  router.put("/:id", controller.update);

  // Delete a review.
  router.delete("/:id", controller.delete);

  // Delete all reviews for a specific user.
  router.delete("/byUser/:email", controller.deleteByUserEmail);

  // Add routes to server.
  app.use("/api/review", router);
};