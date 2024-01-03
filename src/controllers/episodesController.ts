import { Request, Response } from "express"
import { episodeService } from "../services/episodeService"
import { AuthenticatedRequest } from "../middlewares/auth"

export const episodesController = {
    // GET /episodes/stream?videoUrl=

    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query
        
        try {
            if (typeof videoUrl !== 'string') {
                throw new Error('videoUrl param must be of type string')
            }
            
            const range = req.headers.range // vem como: bytes=0-1024

            episodeService.streamEpisodeToResponse(res, videoUrl, range)
        } 
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // GET /episodes/:id/watchTime
    getWatchTime: async (req: AuthenticatedRequest, res: Response) => { // AuthRequest serve apenas para pegar o ID do usuário autenticado de maneira mais simples pela propria requisição
        const userId = req.user!.id // id do usuário logado passado no header da requisição pelo jwt
        const episodeId = req.params.id // id do episodio passado na url da requisição
    
        try {
            const watchTime = await episodeService.getWatchTime(userId, Number(episodeId))    
            return res.json(watchTime)
        } 
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // POST /episodes/:id/watchTime
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => { // AuthRequest serve apenas para pegar o ID do usuário autenticado de maneira mais simples pela propria requisição
        const userId = req.user!.id // id do usuário logado passado no header da requisição pelo jwt
        const episodeId = req.params.id // id do episodio passado na url da requisição
        const { seconds } = req.body // segundos do episodio passados no body da requisição
    
        try {
            const watchTime = await episodeService.setWatchTime({
                // parametros passados como objeto pois neste metodo é passado como parametro um ojeto que cumpre contrato com a interface WatchTimeAttributes
                userId: userId,
                episodeId: Number(episodeId),
                seconds: seconds
            })  
            return res.json(watchTime)
        } 
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}