import express, { Request, Response } from 'express'
import auth from '../middleware/auth'
import { Order, Orders } from '../models/orders'

const store = new Orders()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (err) {
        res.json(err)
    }
}

// SHOW SINGLE ORDER BY ID
const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.json(err)
    }
}

// CREATE NEW ORDER
const create = async (req: Request, res: Response) => {
    const order: Order = {
        status: req.body.status as string,
        user_id: req.body.user_id,
    }
    const newOrder = await store.create(order)

    try {
        res.json(newOrder)
    } catch (err) {
        res.json(err)
    }
}

// UPATE ORDER
const update = async (req: Request, res: Response) => {
    try {
        const updated = await store.update({
            id: parseInt(req.body.id as string),
            status: req.body.status as string,
            user_id: req.body.user_id,
        })
        res.json(updated)
    } catch (err) {
        res.json(err)
    }
}
// DELETE ORDER FROM ORDERS TABLE
const remove = async (req: Request, res: Response) => {
    try {
        const removed = await store.delete(req.body.id)
        res.json(removed)
    } catch (err) {
        res.json(err)
    }
}

// ADD PRODUCTS TO ORDERS TABLE
const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)
    try {
        const addedProduct = await store.addProduct(
            orderId,
            productId,
            quantity
        )
        res.json(addedProduct)
    } catch (err) {
        res.json(err)
    }
}

const cart = async (_req: Request, res: Response) => {
    try {
        const cartItem = await store.cart()
        res.json(cartItem)
    } catch (err) {
        res.json(err)
    }
}

// ORDERS ROUTES
const orders_route = (app: express.Application) => {
    app.get('/orders', auth, index)
    app.get('/orders/:id', auth, show)
    app.post('/orders', auth, create)
    app.put('/orders', auth, update)
    app.delete('/orders/', auth, remove)
    app.post('/orders/:id/products', auth, addProduct)
    app.get('/cart', auth, cart)
}

export default orders_route
