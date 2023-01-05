import supertest from 'supertest'
import app from '../../server'

const req = supertest(app)

describe('orders handler', () => {
    it('crate order router', () => {
        const order = {
            status: 'active',
            user_id: 1,
        }
        req.post('/orders')
            .send(order)
            .expect(201)
            .expect('Content-type', 'Application/json')
    })

    it('get orders route', () => {
        req.get('/orders')
            .expect(200)
            .expect('Content-type', 'Application/json')
    })

    it('update order', () => {
        req.put('/orders')
            .send({
                id: 1,
                status: 'expired',
            })
            .expect(200)
            .expect('Content-type', 'Application/json')
    })

    it('delete order', () => {
        req.delete('/orders/1')
            .expect(200)
            .expect('Content-type', 'Application/json')
            .expect({})
    })

    it('add products to orders', () => {
        req.post('/orders/1/products')
            .send({
                productId: 1,
                quantity: 1,
            })
            .expect(200)
            .expect('Content-type', 'Application/json')
    })

    it('cart route', () => {
        req.get('/cart').expect(200).expect('Content-type', 'Application/json')
    })
})
