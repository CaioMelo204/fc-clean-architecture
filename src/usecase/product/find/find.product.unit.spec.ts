import {FindProductUseCase} from "./find.product.usecase";

describe('FindProduct', () => {
    const repository: any = jest.fn()
    
    it('Should return an Product', async () => {
        repository.find = jest.fn().mockResolvedValueOnce({
            id: 'fake-id',
            name: 'fake-name',
            price: 50,
        })
        
        const service = new FindProductUseCase(repository)
        
        expect(await service.execute({
            id: 'fake-id',
        })).toEqual({
            id: 'fake-id',
            name: 'fake-name',
            price: 50,
        })
    })
})