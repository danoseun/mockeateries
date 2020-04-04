module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Rooms",
      [
        {
          type: 'single room',
          guest_type: "male and female",
          number_of_beds: 4,
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          type: 'mixed dorm room',
          guest_type: "male and female",
          number_of_beds: 4,
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          type: 'dorm room',
          guest_type: "all females",
          number_of_beds: 4,
          price: 25000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          type: 'mixed dorm room',
          guest_type: "male and female",
          number_of_beds: 8,
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          type: 'deluxe room',
          guest_type: "male and female",
          number_of_beds: 1,
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          type: 'standard double room',
          guest_type: "male and female",
          number_of_beds: 2,
          price: 60000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],

      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Rooms", null, {})
};


