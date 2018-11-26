'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.FLOAT
      },
      transaction_type: {
        type: Sequelize.STRING
      },
      transaction_timestamp: {
        type: Sequelize.STRING
      },
      post_date: {
        type: Sequelize.STRING
      },
      current_balance: {
        type: Sequelize.FLOAT
      },
      interest_accrued: {
        type: Sequelize.FLOAT
      },
      transaction_approved: {
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cards');
  }
};