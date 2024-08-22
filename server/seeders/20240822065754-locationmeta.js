'use strict';
let data = require("../data/datadata.json")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MetaLocations', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MetaLocations', null, {});
  }
};
