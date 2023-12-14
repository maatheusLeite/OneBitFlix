import { Request, Response } from "express"
import { Category } from "../models"

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name', 'position'], // Atributos retornados no json
                order: [['position', 'ASC']]    // Ordena os resultados pelo campo position, de maneira ascendente
            })
            return res.json(categories)
        }
        catch (error) {
            if (error instanceof Error) { // caso o error seja uma instancia de Error, do javascript
                return res.status(400).json({ message: error.message })
            }
        }
    }
}