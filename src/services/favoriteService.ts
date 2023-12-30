import { Favorite } from "../models"

export const favoriteService = {
    findByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
            attributes: [['user_id', /*as*/ 'userId' ]], // Atributos filtrados retornados na requisição
            where: { userId: userId }, // Apenas os favoritos do usuário com o id especifico
            include: {
                association: 'Course', // Apenas associação do curso pois no front-end serão devolvidos cursos favoritados com suas informações pré carregadas da associação
                attributes: [   // Atributos filtrados retornados na requisição provenientes da associação
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', /*as*/ 'thumbnailUrl']
                ]
            }
        })

        return { // Retorna a resposta de maneira mais organizada em um objeto personalizado
            userId: userId,
            courses: favorites.map(favorite => favorite.Course) 
        }
    },

    create: async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            courseId: courseId,
            userId: userId
        })

        return favorite
    },

    delete: async (userId: number, courseId: number) => {
        await Favorite.destroy({
            where: {    // Deletar curso onde o userId e courseId sejam os especificados
                userId: userId,
                courseId: courseId
            }
        })
    }
}