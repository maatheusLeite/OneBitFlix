import express from "express"
import cors from "cors"
import { adminJs, adminJsRouter } from "./adminjs"
import { sequelize } from "./database"
import { router } from "./routes"

const app = express()

app.use(cors()) // Permite que a API receba requisições de origens diferentes

app.use(express.static('public'))

app.use(express.json()) // para poder usar o body das requisições em json

// app.use(caminho, rotas)
app.use(adminJs.options.rootPath, adminJsRouter)

// usa o router do express
app.use(router)

const PORT = process.env.PORT || 3000 // Pega a porta do arquivo de variaves de ambiente env, || OU utiliza a porta 3000 caso o arquivo não possua uma variavel especifica para a porta.

app.listen(PORT, () => {
    // Executa uma query qualquer e se ela funcionar, a conexão com o banco é autenticada
    sequelize.authenticate().then(() => {
        console.log('DB connection successfull')
    })
    
    console.log(`Server started successfuly at port ${PORT}`)
})