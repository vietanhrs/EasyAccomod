'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postID: { type: Sequelize.INTEGER(32).UNSIGNED },
      postName: { type: Sequelize.TEXT },
      type: { type: Sequelize.INTEGER(32).UNSIGNED },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      accountUsername: {
        type: Sequelize.STRING(20),
        references: { model: 'accounts', key: 'username' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('notifications');
  },
};
