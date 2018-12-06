'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    customer_id: DataTypes.INTEGER,
    apr: DataTypes.FLOAT,
    credit_limit: DataTypes.FLOAT,
    current_balance: DataTypes.FLOAT,
    interest_accrued: DataTypes.FLOAT,
  }, {});
  Card.associate = function(models) {
    // Card.belongsTo(models.customer, {foreignKey: 'customerId'});
    // associations can be defined here
    Card.hasMany(models.transactions, {
      foreignKey: {
        name:'test-transaction',
        allowNull: false
      }
    })
  };
  return Card;
};