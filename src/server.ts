import express from "express"

const app = express()

const PORT = process.env.PORT || 3000 // Pega a porta do arquivo de variaves de ambiente env, || OU utiliza a porta 3000 caso o arquivo não possua uma variavel especifica para a porta.

app.listen(PORT, () => {
    console.log(`Server started successfuly at port ${PORT}`)
})