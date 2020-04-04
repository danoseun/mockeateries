module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        role: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jon Doe',
        email: 'jondoe@example.com',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Idowu Funke',
        email: 'funkdows@example.com',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tunmise Jones',
        email: 'tunjones@example.com',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eremza Jacob',
        email: 'eremzajacob@example.com',
        role: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
