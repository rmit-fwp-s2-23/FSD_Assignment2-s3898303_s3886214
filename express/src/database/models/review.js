/*Kaiyan (s3898303), Moosa (s3898303)*/
/* review.js */

module.exports = (sequelize, DataTypes) =>
  sequelize.define("review", {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,  // minimum rating value (you can adjust)
        max: 5   // maximum rating value (you can adjust)
      }
    },
    movie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });