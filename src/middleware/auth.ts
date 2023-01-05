import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/users'

export function signToken(user: User): string {
    return jwt.sign({ user }, process.env.TOKEN_SECRET as string)
}

// AUTHORIZATION
const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : ''

    try {
        res.locals.userData = jwt.verify(
            token,
            process.env.TOKEN_SECRET as string
        )
        next()
    } catch (err) {
        res.status(401) //UNATHORIZED
        res.json('Access denid')
    }
}
export default auth
