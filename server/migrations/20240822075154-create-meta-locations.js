'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MetaLocations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.TEXT
      },
      cid: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      review_rating: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      longtitude: {
        type: Sequelize.STRING
      },
      timezone: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MetaLocations');
  }
};