'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      commentID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      parentCommentID: { type: Sequelize.INTEGER(32).UNSIGNED },
      content: { type: Sequelize.TEXT },
      verifiedStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
      starsReview: { type: Sequelize.FLOAT },
      createdAt: { type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE },
      PostPostID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        references: { model: 'posts', key: 'postID' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      accountUsername: {
        type: Sequelize.STRING(20),
        references: { model: 'accounts', key: 'username' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comments');
  },
};
