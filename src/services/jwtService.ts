import jwt from 'jsonwebtoken'

const secret = 'chave-do-jwt' // base da decodificação da senha. NÃO DEIXAR EXPOSTO NO CODIGO SALVO EM REPOSITÓRIOS 

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, { expiresIn: expiration })
    }
}