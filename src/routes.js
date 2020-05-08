const routes = require('express').Router()
const SessionController = require('./app/controllers/SessionsController')
const authMiddleware = require('./app/middleware/auth')

// Definição rotas
routes.post('/sessions', SessionController.store)

// Middleware de autenticação
// Tudo abaixo disto deverá ser autenticado
routes.use(authMiddleware)

routes.get('/dashboard', (req, res) => {
    return res.status(200).send()
})

module.exports = routes