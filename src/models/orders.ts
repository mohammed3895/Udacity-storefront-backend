import client from '../database'

export type Order = {
    id?: number
    status: string
    user_id: number
}

export class Orders {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`cannot get order ${err}`)
        }
    }

    // CRUD FUNCTIONALTY
    // SHOW SINGLE OBJECT
    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id = ($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`cannot get order ${id}. Error: ${err}`)
        }
    }

    // CREATE SINGLE OBJECT
    async create(o: Order): Promise<Order> {
        try {
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.status, o.user_id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`cannot create order ${err}`)
        }
    }

    async update(o: Order): Promise<Order> {
        try {
            const sql =
                'UPDATE orders SET status = $2 user_id = ($3) WHERE id=($1) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.status, o.id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not order Error: ${err}`)
        }
    }

    // DELETE SINGLE OBJECT
    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not order product ${id}. Error: ${err}`)
        }
    }
    // ADD PRODUCTS TO ORDERS TABLE
    async addProduct(
        orderId: string,
        productId: string,
        quantity: number
    ): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql =
                'INSERT INTO order_products (order_id , product_id , quantity) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [orderId, productId, quantity])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error('Somthing wrong! please try again')
        }
    }

    // SHOW ORDERED PRODUCTS
    async cart(): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM order_products'
            const result = await conn.query(sql)
            const cartItem = result.rows[0]
            conn.release()
            return cartItem
        } catch (err) {
            throw new Error('Somthing wrong! please try again')
        }
    }
}
