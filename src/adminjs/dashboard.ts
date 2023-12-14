import AdminJS, { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../models"

export const dashboardOptions: {
    handler?: PageHandler,
    component?: string
} = {
    component: AdminJS.bundle("./components/Dashboard"), // Serve para empacotar junto com a aplicação, o componente inserido
    handler: async (req, res, context) => { // Pega os dados do dashboard no banco de dados
        const courses = await Course.count()
        const episodes = await Episode.count()
        const categories = await Category.count()
        const standardUsers = await User.count({ where: { role: 'user' } })

        // Retorna os valores como json para o dashboard
        res.json({
            'Cursos': courses,
            'Episódios': episodes,
            'Categorias': categories,
            'Usuários': standardUsers
        })
    }
}
