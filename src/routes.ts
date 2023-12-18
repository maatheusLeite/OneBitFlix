import express from "express"
import { categoriesController } from "./controllers/categoriesController"

const router = express.Router()

router.get('/categories', categoriesController.index) // rota, metodo index do objeto categoriesController
router.get('/categories/:id', categoriesController.show) // rota, metodo show do objeto categoriesController 

export { router }