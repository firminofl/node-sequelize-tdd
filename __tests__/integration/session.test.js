// Dar um nome para o teste em que seja fácil saber o que ele irá fazer
// it: isto
// describe: é como se fosse uma categoria dos testes
// Não é legal usar a mesma base de dados do desenvolvimento e dos testes

const request = require('supertest')

const app = require('../../src/app')
const factory = require('../factories')

const truncate = require('../utils/truncate')

describe('Authentication', () => {
    // Limpar a base de dados antes de cada teste para não fica lixo e atrapalhar os testes
    beforeEach(async () => {
        await truncate()
    })
    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123456'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123456'
            })

        expect(response.status).toBe(401)

    })

    it('should return JWT token when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123'
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '123'
            })

        expect(response.body).toHaveProperty("token")

    })

    it('should be able access private routes when authenticated', async () => {
        const user = await factory.create('User', {
            password: '123'
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200)

    })

    it('should not be able access private routes without JWT token', async () => {
        const response = await request(app).get('/dashboard')

        expect(response.status).toBe(401)

    })

    it('should not be able access private routes invalid JWT token', async () => {
        const user = await factory.create('User', {
            password: '123'
        })

        const response = await request(app)
            .get('/dashboard')
            .set('Authorization', `Bearer ${111}`)

        expect(response.status).toBe(401)

    })
})