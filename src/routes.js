const routes = require('express').Router
const { User } = require('./app/models')

User.create({
    name: 'Filipe Firmino',
    email: 'filipefirmino@gec.inatel.br',
    password_hash: '1234567890'
})

// Definição rotas

module.exports = routes