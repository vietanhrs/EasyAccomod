'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      roomID: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      roomType: { type: Sequelize.STRING(30) },
      rented: { type: Sequelize.BOOLEAN, defaultValue: false },
      sharedOwner: { type: Sequelize.BOOLEAN },
      area: { type: Sequelize.INTEGER(10) },
      description: { type: Sequelize.TEXT },
      homeNumber: { type: Sequelize.INTEGER(10).UNSIGNED },
      street: { type: Sequelize.STRING(30) },
      ward: { type: Sequelize.STRING(30) },
      district: { type: Sequelize.STRING(30) },
      city: { type: Sequelize.STRING(30) },
      monthPrice: { type: Sequelize.INTEGER(32).UNSIGNED },
      quarterPrice: { type: Sequelize.INTEGER(32).UNSIGNED },
      yearPrice: { type: Sequelize.INTEGER(32).UNSIGNED },
      bathroom: { type: Sequelize.TEXT },
      kitchen: { type: Sequelize.TEXT },
      airconditioner: { type: Sequelize.BOOLEAN },
      balcony: { type: Sequelize.BOOLEAN },
      electricityPrice: { type: Sequelize.INTEGER(32).UNSIGNED },
      waterPrice: { type: Sequelize.INTEGER(32).UNSIGNED },
      imageURI: { type: Sequelize.TEXT },
      otherUtils: { type: Sequelize.TEXT },
      accountUsername: {
        type: Sequelize.STRING(20),
        references: { model: 'accounts', key: 'username' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rooms');
  },
};
