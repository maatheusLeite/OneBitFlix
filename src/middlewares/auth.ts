import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Não autorizado: Nenhum token foi encontrado.' })
    }

    // O Bearer token funciona com um token após a palavra Bearer, como mostrado abaixo
    // Bearer eifjaiejf02e98390qhjr38h18h0832he
    const token = authorizationHeader.replace(/Bearer /, '') // este metodo remove o Bearer e deixa apenas o token na string

    jwtService.verifyToken(token, async (error, decoded) => {
        if (error || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: Token inválido.' })
        }

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { token } = req.query

    if (!token) {
        return res.status(401).json({ message: 'Não autorizado: Nenhum token foi encontrado.' })
    }

    if (typeof token !== 'string') {
        return res.status(401).json({ message: 'O parâmetro token deve ser do tipo string.' })
    }

    jwtService.verifyToken(token, async (error, decoded) => {
        if (error || typeof decoded === 'undefined') {
            return res.status(401).json({ message: 'Não autorizado: Token inválido.' })
        }

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}