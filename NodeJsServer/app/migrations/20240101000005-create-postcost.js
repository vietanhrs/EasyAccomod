'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('postcost', {
      weekCost: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        allowNull: false,
      },
      monthCost: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        allowNull: false,
      },
      yearCost: {
        type: Sequelize.INTEGER(32).UNSIGNED,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('postcost');
  },
};
