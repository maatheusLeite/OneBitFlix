import { Course } from "../models"

export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [   // Atributos retornados no json
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']   // renomeia a coluna de snake_case para camelCase
            ],
            include: {                              // Inclui uma associação de uma outra tabela
                association: 'episodes',    // Associação com outra tabela, importante ter o mesmo nome da tabela em /src/models/index.ts
                attributes: [    // Atributos retornados no json da associação
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'] // Essas traduções são feitas para auxiliar na resposta json deste objeto em camelCase
                ],
                order: [['order', 'ASC']], // Ordena os resultados pelo campo order, de maneira ascendente
                separate: true    // Serve para rodar o include em uma query separada, para que seja possivel utilizar o order
            }
        })

        return courseWithEpisodes
    }
}