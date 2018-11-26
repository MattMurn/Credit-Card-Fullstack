'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    credit_score: DataTypes.INTEGER,
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
   
  };
  return Customer;
};