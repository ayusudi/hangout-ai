'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MetaLocations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MetaLocations.init({
    title: DataTypes.STRING,
    link: DataTypes.TEXT,
    cid: DataTypes.STRING,
    category: DataTypes.STRING,
    review_rating: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longtitude: DataTypes.STRING,
    timezone: DataTypes.STRING,
    images: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'MetaLocations',
  });
  return MetaLocations;
};