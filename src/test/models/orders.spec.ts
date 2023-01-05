import { User, Users } from '../../models/users'
import { Order, Orders } from '../../models/orders'

const users = new Users()
const store = new Orders()

describe('orders model', () => {
    beforeAll(async () => {
        await users.create({
            user_name: 'john',
            email: 'john@mail.com',
            password: 'pass123',
        })
    })

    it('order index', () => {
        expect(store.index()).toBeDefined()
    })

    it('create order', async () => {
        const result = await store.create({
            status: 'active',
            user_id: 1,
        })
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: 1,
        })
    })

    it('show order', async () => {
        const result = await store.show('1')
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: 1,
        })
    })
})
