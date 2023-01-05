import express, { Request, Response } from 'express'
import { User, Users } from '../models/users'
import jwt from 'jsonwebtoken'
import { signToken } from '../middleware/auth'

const users = new Users()

const index = async (_req: Request, res: Response): Promise<void> => {
    const Products = await users.index()
    res.json(Products)
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await users.show(req.params.id)
        res.json(user)
    } catch (err) {
        throw new Error(`Unable to get product ${err}`)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        user_name: req.body.user_name as string,
        email: req.body.email as string,
        password: req.body.password as string,
    }

    if (!user.user_name) {
        res.json('enter user name')
    }
    if (!user.email) {
        res.json('enter your email')
    }
    if (!user.password) {
        res.json('enter your password')
    }

    try {
        const newUser = await users.create(user)
        jwt.sign(
            { userName: user.user_name, email: user.email },
            process.env.TOKEN_SECRET as string
        )
        res.json(newUser)
    } catch (err) {
        throw new Error(`${err}`)
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const updated = await users.update({
            id: parseInt(req.body.id as string),
            user_name: req.body.user_name as string,
            email: req.body.email as string,
            password: req.body.password as string,
        })
        res.json(updated)
    } catch (err) {
        throw new Error(`Cant update the user ${err}`)
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const removed = await users.delete(req.params.id)
        res.json(removed)
    } catch (err) {
        throw new Error(`${err}`)
    }
}

const auth = async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email
        const password: string = req.body.password
        const user: User | null = await users.auth(email, password)

        if (user === null) {
            return false
        }

        res.json(signToken(user))
    } catch (err) {
        res.status(401)
        res.json("user dosn't exist")
    }
}

const users_route = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.put('/users', auth, update)
    app.delete('/users/:id', auth, remove)
    app.post('/auth', auth)
}

export default users_route
