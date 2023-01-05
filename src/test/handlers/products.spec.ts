import supertest from 'supertest'
import app from '../../server'

const req = supertest(app)

describe('products handler', () => {
    it('create product router', () => {
        const product = {
            name: 'product',
            description: 'test product',
            price: '860',
        }

        req.post('/products')
            .send(product)
            .expect(201)
            .expect('Content-type', 'Application/json')
    })

    it('get products route', () => {
        req.get('/products').expect(200)
    })

    it('get single product route', () => {
        req.get('/products/1')
            .expect(200)
            .expect('Content-Type', 'Application/json')
    })

    it('delete products route', () => {
        req.delete('/products/1').expect(200).expect({})
    })
})
