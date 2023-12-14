import { AuthenticationOptions } from "@adminjs/express"
import { User } from "../models"
import bcrypt from 'bcrypt'

export const authenticationOptions: AuthenticationOptions = {
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
}