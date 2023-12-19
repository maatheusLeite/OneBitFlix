import express from "express"
import { categoriesController } from "./controllers/categoriesController"
import { coursesController } from "./controllers/coursesController"

const router = express.Router()

router.get('/categories', categoriesController.index) // rota, metodo index do objeto categoriesController
router.get('/categories/:id', categoriesController.show) // rota, metodo show do objeto categoriesController 

router.get('/courses/featured', coursesController.featured) // rota, metodo featured do objeto courseController 
router.get('/courses/newest', coursesController.newest) // rota, metodo newest do objeto courseController 
router.get('/courses/:id', coursesController.show) // rota, metodo show do objeto courseController 



// ROTAS DINAMICAS COMO courses/:id SEMPRE PRECISAM FICAR ABAIXO DAS ROTAS FIXAS COMO courses/featured
export { router }