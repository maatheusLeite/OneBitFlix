import { Op } from "sequelize"
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
    },

    getRandomFeaturedCourses: async () => {
        const featuredCourses = await Course.findAll({
            attributes: [   // Atributos retornados no json
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']   // renomeia a coluna de snake_case para camelCase
            ],
            where: {
                featured: true
            }
        })

        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())   // Randomiza os cursos a serem retornados

        return randomFeaturedCourses.slice(0, 3)    // A partir da posição zero do array, retorna 3 cursos randomizados
    },

    getTopTenNewest: async () => {
        const courses = await Course.findAll({
            limit: 10, // Pega apenas 10 cursos do banco de dados
            order: [['created_at', 'DESC']] // Ordena por created_at, da mas nova para a mais antiga, ou seja, DESCendente
        })

        return courses
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage // Serve como metodo para pular o numero de registros das paginas anteriores
        
        // count é a quantidade de todos os objetos salvos no banco e rows é a quantidade de linhas especificas retornadas pelo banco de dados
        const { count, rows } = await Course.findAndCountAll({ // findAndCountAll ajuda a numerar os objetos em paginações
            attributes: [   // Atributos retornados no json
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']   // renomeia a coluna de snake_case para camelCase
            ],
            where: {
                name: {
                    [Op.iLike]: `%${name}%` 
                    // Com o Op importado do sequelize, é possivel fazer querys mais complexas utilizando os operadores do sql
                    // iLike é o operador LIKE do postgresql, e serve para pesquisar por resultados semelhantes ao termo referido e sem considerar letras maiusculas. 
                    // %${name}% serve para procurar pelo termo em qualquer posição da string
                }
            },
            limit: perPage, // Limita o tamanho de objetos na query
            offset: offset  // Pula os registros das paginas anteriores   
        })

        return {
            courses: rows,   // array de objetos retornados
            page: page,         // referencia para pagina atual retornada
            perPage: perPage,   // quantidade de objetos retornados por pagina
            total: count        // total de objetos salvos no banco 
        }
    }
}