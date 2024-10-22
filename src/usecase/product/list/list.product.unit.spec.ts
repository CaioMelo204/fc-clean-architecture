import {ListProductUseCase} from "./list.product.usecase";
import {ProductReturn} from "./list.product.dto";

describe('List Products Unit', () => {
    const repository: any = jest.fn()

    it('Should return a list of Products', async () => {
        const repositoryReturn: ProductReturn[] = [{
            id: 'fake-id',
            name: 'fake-name',
            price: 50,
        }, {
            id: 'fake-id-2',
            name: 'fake-name-2',
            price: 60,
        }]

        repository.findAll = jest.fn().mockReturnValueOnce(repositoryReturn)

        const service = new ListProductUseCase(repository)

        expect(await service.execute({})).toEqual({
            products: repositoryReturn,
        })
    })
})