import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database"
import { adminJsResources } from "./resources"
import { User } from "../models"
import bcrypt from 'bcrypt'
import { locale } from "./locale"

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
    },
    locale: locale
})

// Middleware de rotas do admin.js
// Constroi um router com a instancia do amdin.js criada e as opções para o mesmo
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => { // pega o email e senha do formulário utilizado para realizar login
        const user = await User.findOne({ where: { email: email } })

        if (user && user.role === 'admin') {
            const matched = await bcrypt.compare(password, user.password)

            if (matched) {  // Caso a autenticação seja valida, retorna o user
                return user
            }
        }

        // Caso a autenticação não seja valida, retorna false
        return false
    },
    cookiePassword: 'senha-de-cookie'
}, null, {
    resave: false,
    saveUninitialized: false
}) 


