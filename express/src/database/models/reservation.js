/*Kaiyan (s3898303), Moosa (s3898303)*/
/* reservation.js */

// models/reservation.js

// Export a function that defines the "reservation" model and its properties.
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("reservation", {
    reservationId: {
      type: DataTypes.INTEGER, // Define a field for reservation ID
      primaryKey: true, // Set it as the primary key
      autoIncrement: true // Enable auto-increment for this field
    },
    sessionTime: {
      type: DataTypes.STRING(5), // Define a field for session time (in HH:MM format)
      allowNull: false // Ensure the session time is a required field (not null)
    },
    seats: {
      type: DataTypes.INTEGER, // Define a field for the number of seats
      allowNull: false, // Ensure the number of seats is a required field (not null)
      validate: {
        min: 1, // Specify a minimum value of 1 for the number of seats
        max: 10 // Specify a maximum value of 10 for the number of seats
      }
    }
  }, {
    timestamps: true // Enable timestamps (CreatedAt and UpdatedAt) for the model
  });
};
