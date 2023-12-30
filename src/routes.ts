import express from "express"
import { categoriesController } from "./controllers/categoriesController"
import { coursesController } from "./controllers/coursesController"
import { episodesController } from "./controllers/episodesController"
import { authController } from "./controllers/authController"
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth"
import { favoritesController } from "./controllers/favoritesController"
import { likesController } from "./controllers/likesController"

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

router.get('/favorites', ensureAuth, favoritesController.index) // rota, handler que garante que a rota está autenticada, metodo index do objeto favoritesController  
router.post('/favorites', ensureAuth, favoritesController.save) // rota, handler que garante que a rota está autenticada, metodo save do objeto favoritesController  
router.delete('/favorites/:id', ensureAuth, favoritesController.delete) // rota, handler que garante que a rota está autenticada, metodo delete do objeto favoritesController  

router.post('/likes', ensureAuth, likesController.save)// rota, handler que garante que a rota está autenticada, metodo save do objeto likesController  

// ROTAS DINAMICAS COMO courses/:id SEMPRE PRECISAM FICAR ABAIXO DAS ROTAS FIXAS COMO courses/featured
export { router }