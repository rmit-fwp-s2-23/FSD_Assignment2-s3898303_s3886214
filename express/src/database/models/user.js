/*Kaiyan (s3898303), Moosa (s3898303)*/
/* user.js */

// models/user.js

module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    email: {
      type: DataTypes.STRING(100), // Define a field for the user's email with an increased length
      primaryKey: true // Set the email as the primary key
    },
    password_hash: {
      type: DataTypes.STRING(96), // Define a field for the hashed password
      allowNull: false // Ensure the password_hash is a required field (not null)
    },
    name: {
      type: DataTypes.STRING(40), // Define a field for the user's name with an increased length
      allowNull: false // Ensure the name is a required field (not null)
    }
  }, {
    // Configuration options for the model
    // Disable the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
