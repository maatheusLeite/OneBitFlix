import { Favorite } from "../models"

export const favoriteService = {
    create: async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            courseId: courseId,
            userId: userId
        })

        return favorite
    }
}