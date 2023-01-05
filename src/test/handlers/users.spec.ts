import supertest from 'supertest'
import app from '../../server'

const req = supertest(app)

describe('users handler', () => {
    it('crate user router', () => {
        const user = {
            id: 1,
            user_name: 'john',
            email: 'john@mail.com',
            password: 'pass123',
        }

        req.post('/users')
            .send(user)
            .expect(201)
            .expect('Content-type', 'Application/json')
    })

    it('update user route', () => {
        req.get('/users')
            .send({
                id: 1,
                user_name: 'john doe',
                email: 'john@mail.com',
                password: 'pass123',
            })
            .expect(200)
            .expect('Content-type', 'Application/json')
    })

    it('get single user route', () => {
        req.get('/users/1')
            .expect(200)
            .expect('Content-type', 'Application/json')
    })

    it('get users route', () => {
        req.get('/users').expect(200).expect('Content-type', 'Application/json')
    })

    it('delete user', () => {
        req.delete('/users/1')
            .expect(200)
            .expect('Content-type', 'Application/json')
            .expect({})
    })

    it('Auth route', () => {
        req.post('/auth')
            .send({
                email: 'john@mail.com',
                password: 'pass123',
            })
            .expect(200)
    })
})
