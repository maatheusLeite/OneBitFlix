import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database"
import { adminJsResources } from "./resources"

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize], // É um array pois o admin.js poderia trabalhar com mais de um banco de dados
    rootPath: '/admin', // Rota para o painel de administração
    resources: adminJsResources, // Recursos 'models' a serem utilizados pelo painel do adminjs
    branding: { // Disponibiliza costumizações o visual das telas do admin.js
        companyName: 'OneBitFlix',
        logo: '/onebitflix.svg',
        theme: {
            colors: {
                primary100: '#ff0043',
                primary80: '#ff1a57',
                primary60: '#ff3369',
                primary40: '#ff4d7c',
                primary20: '#ff668f',
                grey100: '#151515',
                grey80: '#333333',
                grey60: '#4d4d4d',
                grey40: '#666666',
                grey20: '#dddddd',
                filterBg: '#333333',
                accent: '#151515',
                hoverBg: '#151515',
            }
        }
    }
})

// Middleware de rotas do admin.js
export const adminJsRouter = AdminJSExpress.buildRouter(adminJs) // Constroi um router com a instancia do amdin.js criada

