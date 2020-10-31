const express = require('express')

const AuthController = require('../controllers/authController')

const Router = express.Router()

Router.post('/signup', AuthController.signup)

Router.post('/login', AuthController.login)

Router.post('/verification', AuthController.verification)

Router.post('/addToLiked', AuthController.addToLiked)

Router.post('/removeFromLiked', AuthController.removeFromLiked)

Router.post('/listOfLikedProducts', AuthController.listOfLikedProducts)

Router.post('/addToCart', AuthController.addToCart)

Router.post('/removeFromCart', AuthController.removeFromCart)

Router.post('/listOfCartProducts', AuthController.listOfCartProducts)

Router.post('/changeSize', AuthController.changeSize)

module.exports = Router