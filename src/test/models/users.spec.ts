import { User, Users } from '../../models/users'
import bcrypt, { hash } from 'bcrypt'

const store = new Users()

describe('users model', () => {
    const user: User = {
        user_name: 'ahmed',
        email: 'ahmed@mail.com',
        password: 'pass123',
    }

    // TEST INDEX METHOD
    it('user index', () => {
        expect(store.index()).toBeDefined()
    })
    // TEST CREATING NEW USER
    it('create new user', async () => {
        const result = await store.create(user)
        expect(result.user_name).toEqual('ahmed')
        expect(result.email).toEqual('ahmed@mail.com')
        expect(result.password).toBeDefined()
    })
})
