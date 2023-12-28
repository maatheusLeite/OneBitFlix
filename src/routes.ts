import express from "express"
import { categoriesController } from "./controllers/categoriesController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"
import { authController } from "./controllers/authController"
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth"

const router = express.Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

router.get('/categories', ensureAuth, categoriesController.index) // rota, handler que garante que a rota está autenticada, metodo index do objeto categoriesController
router.get('/categories/:id', ensureAuth, categoriesController.show) // rota, handler que garante que a rota está autenticada, metodo show do objeto categoriesController 

router.get('/courses/featured', ensureAuth, coursesController.featured) // rota, handler que garante que a rota está autenticada, metodo featured do objeto coursesController 
router.get('/courses/newest', coursesController.newest) // rota, metodo newest do objeto coursesController
router.get('/courses/search', ensureAuth, coursesController.search) // rota, handler que garante que a rota está autenticada, metodo search do objeto coursesController  
router.get('/courses/:id', ensureAuth, coursesController.show) // rota, metodo show do objeto coursesController 

router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream) // rota, metodo stream do objeto episodesController 

// ROTAS DINAMICAS COMO courses/:id SEMPRE PRECISAM FICAR ABAIXO DAS ROTAS FIXAS COMO courses/featured
export { router }