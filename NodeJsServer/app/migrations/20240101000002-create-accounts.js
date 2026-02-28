'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      username: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING(100),
      },
      accountType: {
        type: Sequelize.STRING(10),
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userIdCard: {
        type: Sequelize.STRING(20),
        references: { model: 'users', key: 'idCard' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('accounts');
  },
};
