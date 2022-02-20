'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn('Profiles', 'profilePicture', {
        type: Sequelize.STRING
      }),
    ]);
  },

  down: async (queryInterface) => {
    return Promise.all([await queryInterface.removeColumn('Profiles', 'profilePicture')]);
  },
};
