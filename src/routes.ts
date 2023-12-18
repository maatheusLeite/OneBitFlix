import express from "express"
import { categoriesController } from "./controllers/categoriesController"
import { coursesController } from "./controllers/coursesController"

const router = express.Router()

router.get('/categories', categoriesController.index) // rota, metodo index do objeto categoriesController
router.get('/categories/:id', categoriesController.show) // rota, metodo show do objeto categoriesController 

router.get('/courses/:id', coursesController.show) // rota, metodo show do objeto courseController 

export { router }