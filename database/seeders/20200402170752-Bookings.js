module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Bookings",
      [
        {
          number_of_guests: 2,
          user_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('7/13/20'),
          checkout_date: new Date('7/18/20')
        },
        {
          number_of_guests: 4,
          user_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('3/13/20'),
          checkout_date: new Date('3/16/20')
        },
        {
          number_of_guests: 3,
          user_id: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('3/13/20'),
          checkout_date: new Date('3/15/20')
        },
        {
          number_of_guests: 4,
          user_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('4/13/20'),
          checkout_date: new Date('4/15/20')
        },
        {
          number_of_guests: 3,
          user_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('2/10/20'), 
          checkout_date: new Date('2/13/20')
        },
        {
          number_of_guests: 2,
          user_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
          checkin_date: new Date('1/10/20'),
          checkout_date: new Date('1/13/20')
        },
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Bookings", null, {})
};


