import { Request, Response } from "express"
import { categoryService } from "../services/categoryService"
import { getPaginationParams } from "../helpers/getPaginationParams"

export const categoriesController = {
    // GET /categorie
    index: async (req: Request, res: Response) => {
        const [page, perPage] = getPaginationParams(req.query)

        try {
            const paginatedCategories = await categoryService.findAllPaginated(page, perPage)

            return res.json(paginatedCategories)
        }
        catch (error) {
            if (error instanceof Error) { // caso o error seja uma instancia de Error, do javascript
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // GET /categories/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const category = await categoryService.findByIdWithCourses(id)
            return res.json(category)
        }
        catch (error) {
            if (error instanceof Error) { // caso o error seja uma instancia de Error, do javascript
                return res.status(400).json({ message: error.message })
            }
        }
    }
}
