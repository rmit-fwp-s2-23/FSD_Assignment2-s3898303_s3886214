/*Kaiyan (s3898303), Moosa (s3898303)*/
/* index.js */


// Import necessary dependencies, including Sequelize and data model configurations.
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js"); // Import database configuration settings.

// Create an object to hold the Sequelize connection and models.
const db = {
  Op: Sequelize.Op // Include the "Op" operator for Sequelize queries.
};

// Create a Sequelize instance, establishing the database connection.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST, // Database host
  dialect: config.DIALECT // Database dialect (e.g., "mysql," "postgres," etc.)
});

// Include the data models (user, review, reservation) in the database.
db.user = require("./models/user.js")(db.sequelize, DataTypes); // Include the User model.
db.review = require("./models/review.js")(db.sequelize, DataTypes); // Include the Review model.
db.reservation = require("./models/reservation.js")(db.sequelize, DataTypes); // Include the Reservation model.

// Define associations between models.
db.review.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.reservation.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });

// You can learn more about Sequelize associations at the provided URL.

// Include a sync function for database synchronization with optional seeding.
db.sync = async () => {
  // Synchronize the database schema (create tables, if necessary).
  await db.sequelize.sync();

  // You can choose to sync with force if the schema is out of date, but this is destructive.
  // await db.sequelize.sync({ force: true });
};

// Export the "db" object, including the Sequelize connection and models.
module.exports = db;
