'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    number_of_guests: DataTypes.INTEGER,
    checkin_date: DataTypes.DATE,
    checkout_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'customer',
      onDelete: 'CASCADE',
    })
  };
  return Booking;
};