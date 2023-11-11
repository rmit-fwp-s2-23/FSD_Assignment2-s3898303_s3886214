/*Kaiyan (s3898303), Moosa (s3898303)*/
/* reservation.routes.js */

module.exports = (express, app) => {
const controller = require("../controllers/reservation.controller.js");
const router = express.Router();

// Retrieve all reservations
router.get("/", controller.all);

// Create a new reservation
router.post("/", controller.create);

// Update a reservation by its ID
router.put("/:id", controller.update);

// Delete a reservation by its ID
router.delete("/:id", controller.delete);

app.use("/api/reservation", router);

};