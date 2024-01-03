import { Response } from "express"
import fs from "fs"
import path from "path"
import { WatchTimeAttributes } from "../models/WatchTime"
import { WatchTime } from "../models"

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
        const fileStat = fs.statSync(filePath)

        if (range) {    
            // Entrega pequenas partes do video

            // PEGA O TRECHO DO VIDEO QUE NÓS QUEREMOS 
            const parts = range.replace(/bytes=/, '').split('-')   // Usa uma expressão regular para alterar de bytes= para '' e realiza um split no traço

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start: start, end: end })

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)  // 206 é o status code de conteúdo parcial

            file.pipe(res)
        }
        else {  
            // Entrega o video todo, forma menos eficiente de devolver o arquivo
            
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(200, head) // status 200 OK

            fs.createReadStream(filePath).pipe(res)
        }
    },

    getWatchTime: async (userId: number, episodeId: number) => {
        const watchTime = await WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId: userId,
                episodeId: episodeId
            }
        })

        return watchTime
    },

    setWatchTime: async (attributes: WatchTimeAttributes) => { /* Usa os atributos que compõem a interface WatchTimeAttributes */ 
        const watchTimeAlreadyExists = await WatchTime.findOne({
            where: {
                userId: attributes.userId,
                episodeId: attributes.episodeId
            }
        })

        if (watchTimeAlreadyExists) {
            // Caso o watchTime já exista, ele apenas é atualizado e salvo no banco de dados
            watchTimeAlreadyExists.seconds = attributes.seconds
            await watchTimeAlreadyExists.save()
            
            return watchTimeAlreadyExists
        }
        else {
            // Caso ainda não exista, ele é criado e salvo no banco de dados
            const watchTime = await WatchTime.create({
                userId: attributes.userId,
                episodeId: attributes.episodeId,
                seconds: attributes.seconds
            })

            return watchTime
        }        
    }
}