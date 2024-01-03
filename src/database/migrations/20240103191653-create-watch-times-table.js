'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('watch_times', {
      seconds: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      user_id: {
        allowNull: false,
        primaryKey: true, // Chave primária composta
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'      
      },
      episode_id: {
        allowNull: false,
        primaryKey: true, // Chave primária composta
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'      
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('watch_times')
  }
};
