import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database"
import { adminJsResources } from "./resources"
import { locale } from "./locale"
import { dashboardOptions } from "./dashboard"
import { brandingOptions } from "./branding"
import { authenticationOptions } from "./authentication"

AdminJS.registerAdapter(AdminJSSequelize)   // Adaptador do sequelize 

export const adminJs = new AdminJS({
    databases: [sequelize], // É um array pois o admin.js poderia trabalhar com mais de um banco de dados
    rootPath: '/admin', // Rota para o painel de administração
    resources: adminJsResources, // Recursos 'models' a serem utilizados pelo painel do adminjs
    branding: brandingOptions, // Disponibiliza costumizações o visual das telas do admin.js
    locale: locale,
    dashboard: dashboardOptions
})

// Middleware de rotas do admin.js
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,                // Instancia do adminjs
    authenticationOptions,  // Opções de autenticação
    null,                   // Rotas pré definidas
    {                       // Opções de sessão
        resave: false,
        saveUninitialized: false
    }
)


