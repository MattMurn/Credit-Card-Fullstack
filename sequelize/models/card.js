'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    transaction_id: DataTypes.FLOAT,
    transaction_type: DataTypes.STRING,
    transaction_timestamp: DataTypes.STRING,
    post_date: DataTypes.STRING,
    current_balance: DataTypes.FLOAT,
    interest_accrued: DataTypes.FLOAT,
    transaction_approved: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};