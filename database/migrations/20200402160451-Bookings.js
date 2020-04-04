'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([queryInterface.addColumn(
    'Bookings',
    'checkin_date',
     Sequelize.DATE
   ),
  queryInterface.addColumn(
   'Bookings',
   'checkout_date',
   Sequelize.STRING
),
queryInterface.removeColumn(
  'Bookings',
  'number_of_nights',
  Sequelize.INTEGER
)
]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.dropTable('Bookings');
  
  }
};
