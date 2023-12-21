import express from "express"
import { categoriesController } from "./controllers/categoriesController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"
import { authController } from "./controllers/authController"

const router = express.Router()

router.post('/auth/register', authController.register)

router.get('/categories', categoriesController.index) // rota, metodo index do objeto categoriesController
router.get('/categories/:id', categoriesController.show) // rota, metodo show do objeto categoriesController 

router.get('/courses/featured', coursesController.featured) // rota, metodo featured do objeto coursesController 
router.get('/courses/newest', coursesController.newest) // rota, metodo newest do objeto coursesController
router.get('/courses/search', coursesController.search) // rota, metodo search do objeto coursesController  
router.get('/courses/:id', coursesController.show) // rota, metodo show do objeto coursesController 

router.get('/episodes/stream', episodesController.stream) // rota, metodo stream do objeto episodesController 

// ROTAS DINAMICAS COMO courses/:id SEMPRE PRECISAM FICAR ABAIXO DAS ROTAS FIXAS COMO courses/featured
export { router }