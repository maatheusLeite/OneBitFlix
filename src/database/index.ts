import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'onebitflix_development',
    username: 'developer',
    password: '@Dev1234',
    define: {
        underscored: true // Configura o banco de dados para trabalhar com snake_case
    }
})