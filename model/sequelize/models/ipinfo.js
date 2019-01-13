'use strict';
module.exports = (sequelize, DataTypes) => {
  var ipInfo = sequelize.define('ipInfo', {
    ip: DataTypes.STRING,
    country_name: DataTypes.STRING,
    region_name: DataTypes.STRING,
    zip: DataTypes.STRING,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    time: DataTypes.STRING,

  }, {});
  ipInfo.associate = function(models) {
    // associations can be defined here
  };
  return ipInfo;
};

