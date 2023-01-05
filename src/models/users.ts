import bcrypt from 'bcrypt'
import client from '../database'

export type User = {
    id?: number
    user_name?: string
    email?: string
    password?: string
    password_digest?: string
}
const pepper: string = process.env.BCRYPT_PASSWORD as string
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string)

export class Users {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`cannot get users`)
        }
    }

    // CRUD FUNCTIONALTY
    // SHOW SINGLE OBJECT
    async show(id: string): Promise<User> {
        try {
            const sql =
                'SELECT user_name, email, password FROM users WHERE id = ($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`cannot get user ${id}. Error: ${err}`)
        }
    }

    // CREATE SINGLE OBJECT
    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, saltRounds)
            const conn = await client.connect()
            const result = await conn.query(sql, [u.user_name, u.email, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`cannot create user ${err}`)
        }
    }

    // UPATE DATA FOR SINGLE USER
    async update(u: User): Promise<User> {
        try {
            const conn = await client.connect()
            const sql =
                'UPDATE users SET user_name = $2, email = $3, password = $4 WHERE id = $1'
            const hash = bcrypt.hashSync(u.password + pepper, saltRounds)
            const result = await conn.query(sql, [
                u.id,
                u.user_name,
                u.email,
                hash,
            ])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Can not update user ${err}`)
        }
    }

    // DELETE SINGLE OBJECT
    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user: User = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    // AUTHINTICATION FUNCTION
    async auth(email: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password FROM users WHERE email = $1'
        const result = await conn.query(sql, [email])
        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }
        }
        return null
    }
}
