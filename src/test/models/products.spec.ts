import { Product, ProductStore } from '../../models/products'

const store = new ProductStore()

describe('products model', () => {
    const product: Product = {
        name: 'test',
        description: 'test product',
        price: 1200,
    }

    it('products create', async () => {
        const result = await store.create(product)
        expect(result).toEqual({
            id: 1,
            name: 'test',
            description: 'test product',
            price: 1200,
        })
    })

    it('products show', async () => {
        const products = await store.show('1')
        expect(products).toEqual({
            id: 1,
            name: 'test',
            description: 'test product',
            price: 1200,
        })
    })

    it('update product', async () => {
        const result = await store.update({
            id: 1,
            name: 'test',
            description: 'test product',
            price: 2000,
        })
        expect(result).toEqual({
            id: 1,
            name: 'test',
            description: 'test product',
            price: 2000,
        })
    })

    it('delete product', async () => {
        await store.delete('1')
        const result = await store.show('1')
        expect(result).toBeUndefined()
    })
})
