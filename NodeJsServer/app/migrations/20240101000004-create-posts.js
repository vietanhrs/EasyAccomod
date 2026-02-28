'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      postID: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      postName: { type: Sequelize.TEXT },
      postTime: { type: Sequelize.DATE, defaultValue: null },
      expiredTime: { type: Sequelize.DATE, defaultValue: null },
      verifiedStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
      viewsNumber: { type: Sequelize.INTEGER(32), defaultValue: 0 },
      likesNumber: { type: Sequelize.INTEGER(32).UNSIGNED, defaultValue: 0 },
      starsReview: { type: Sequelize.FLOAT, defaultValue: 0 },
      postWeek: { type: Sequelize.INTEGER(8).UNSIGNED, defaultValue: 1 },
      postMonth: { type: Sequelize.INTEGER(8).UNSIGNED, defaultValue: 0 },
      postYear: { type: Sequelize.INTEGER(8).UNSIGNED, defaultValue: 0 },
      postCost: { type: Sequelize.INTEGER(32).UNSIGNED },
      paidAmount: { type: Sequelize.INTEGER(32).UNSIGNED, defaultValue: 0 },
      paymentStatus: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE },
      roomID: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        references: { model: 'rooms', key: 'roomID' },
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
    await queryInterface.dropTable('posts');
  },
};
