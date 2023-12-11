import express from "express"
import { sequelize } from "./database"

const app = express()

const PORT = process.env.PORT || 3000 // Pega a porta do arquivo de variaves de ambiente env, || OU utiliza a porta 3000 caso o arquivo não possua uma variavel especifica para a porta.

app.listen(PORT, () => {
    // Executa uma query qualquer e se ela funcionar, a conexão com o banco é autenticada
    sequelize.authenticate().then(() => {
        console.log('DB connection successfull')
    })
    
    console.log(`Server started successfuly at port ${PORT}`)
})