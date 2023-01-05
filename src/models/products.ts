import client from '../database'

export type Product = {
    id?: number
    name: string
    description: string
    price: number
    token?: string
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`cannot get product ${err}`)
        }
    }

    // CRUD FUNCTIONALTY
    // SHOW SINGLE OBJECT
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id = ($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`cannot get product ${id}. Error: ${err}`)
        }
    }

    // CREATE SINGLE OBJECT
    async create(p: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [
                p.name,
                p.description,
                p.price,
            ])
            const product: Product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`cannot create product ${err}`)
        }
    }

    // UPATE DATA IN SINGLE COLUMN
    async update(p: Product): Promise<Product> {
        try {
            const conn = await client.connect()
            const sql =
                'UPDATE products SET name = $2, description = $3, price = $4 WHERE id = $1 RETURNING *'
            const result = await conn.query(sql, [
                p.id,
                p.name,
                p.description,
                p.price,
            ])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Can not delete product ${err}`)
        }
    }

    // DELETE SINGLE OBJECT
    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const product: Product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}
