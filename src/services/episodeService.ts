import { Response } from "express"
import fs from "fs"
import path from "path"

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
    }
}