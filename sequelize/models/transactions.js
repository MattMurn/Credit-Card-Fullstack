'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transactions = sequelize.define('transactions', {
    transaction_id: DataTypes.FLOAT,
    card_id: DataTypes.INTEGER,
    transaction_type: DataTypes.STRING,
    transaction_timestamp: DataTypes.STRING,
    post_date: DataTypes.STRING,
    transaction_amount: DataTypes.FLOAT,
    current_balance: DataTypes.FLOAT,
    interest_accrued: DataTypes.FLOAT,
    transaction_approved: DataTypes.STRING
  }, {});
  Transactions.associate = function(models) {
    // associations can be defined here
  };
  return Transactions;
};