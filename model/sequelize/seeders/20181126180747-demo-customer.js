'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
 */
      return queryInterface.bulkInsert('Customers', [{
        first_name: 'Matthew',
        last_name: 'Murnighan',
        credit_score: 750,
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        first_name: 'Abby',
        last_name: 'Rose',
        credit_score: 500,
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        first_name: 'Michael',
        last_name: 'Conners',
        credit_score: 650,
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        first_name: 'Jill',
        last_name: 'Scott',
        credit_score: 610,
        createdAt: new Date(),
        updatedAt: new Date() 
      }], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 */
      return queryInterface.bulkDelete('Customers', null, {});
   
  }
};
