import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/products'
import jwt from 'jsonwebtoken'
import auth from '../middleware/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const Products = await store.index()
        res.json(Products)
    } catch (err) {
        res.json(err)
    }
}

// SHOWING SINGLE PRODUCT
const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.json(err)
    }
}

// CREATE NEW PRODUCT
const create = async (req: Request, res: Response): Promise<void> => {
    const product: Product = {
        name: req.body.name as string,
        description: req.body.description as string,
        price: parseInt(req.body.price as string),
    }

    if (!product.name || !product.price) {
        res.json({ messege: 'Some info is missing' })
    }

    // CREATE NEW PRODUCT IF TOKEN IS VALID
    try {
        const newProduct: Product = await store.create(product)
        res.json(newProduct)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

// UPDATE PRODUCT
const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated = await store.update({
            id: parseInt(req.params.id as string),
            name: req.body.name as string,
            description: req.body.description as string,
            price: parseInt(req.body.price as string),
        })
        res.json(updated)
    } catch (err) {
        res.json(err)
    }
}

// DELETE PRODUCT
const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const removed = await store.delete(req.params.id)
        res.json(removed)
    } catch (err) {
        res.json(err)
    }
}

// PRODUCTS ROUTES
const products_route = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', auth, create)
    app.put('/products/:id', auth, update)
    app.delete('/products/:id', auth, remove)
}

export default products_route
