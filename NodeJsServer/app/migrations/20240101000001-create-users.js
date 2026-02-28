'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      idCard: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING(30),
      },
      phoneNumber: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(30),
      },
      address: {
        type: Sequelize.TEXT,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
