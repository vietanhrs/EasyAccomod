'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExtendRequests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      newExpireDate: { type: Sequelize.DATE, defaultValue: null },
      price: { type: Sequelize.INTEGER(32).UNSIGNED, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      postID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        references: { model: 'posts', key: 'postID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ExtendRequests');
  },
};
