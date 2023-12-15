import { Category } from "../models"

export const categoryService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage // Serve como metodo para pular o numero de registros das paginas anteriores
    
        // count é a quantidade de todos os objetos salvos no banco e rows é a quantidade de linhas especificas retornadas pelo banco de dados
        const { count, rows } = await Category.findAndCountAll({   // findAndCountAll ajuda a numerar os objetos em paginações
            attributes: ['id', 'name', 'position'], // Atributos retornados no json
            order: [['position', 'ASC']],    // Ordena os resultados pelo campo position, de maneira ascendente
            limit: perPage,            // Limita o tamanho de objetos na query
            offset: offset                   // Pula os registros das paginas anteriores                 
        })

        return {
            categories: rows,   // array de objetos retornados
            page: page,         // referencia para pagina atual retornada
            perPage: perPage,   // quantidade de objetos retornados por pagina
            total: count        // total de objetos salvos no banco 
        }
    }
}