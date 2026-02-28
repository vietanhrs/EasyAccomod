'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reportedposts', {
      reportID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      content: { type: Sequelize.TEXT },
      reportedAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      PostPostID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        references: { model: 'posts', key: 'postID' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      accountUsername: {
        type: Sequelize.STRING(20),
        references: { model: 'accounts', key: 'username' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('reportedposts');
  },
};
