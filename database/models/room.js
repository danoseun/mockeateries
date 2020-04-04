'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    type: DataTypes.STRING,
    guest_type: DataTypes.STRING,
    number_of_beds: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};