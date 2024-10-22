import {UpdateProductUseCase} from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("UpdateProduct unit", () => {
    const repository: any = jest.fn();

    it("should update product", async () => {
        const returned = new Product('fake-id', 'fake-name', 50)

        repository.find = jest.fn().mockResolvedValueOnce(returned)

        repository.update = jest.fn().mockResolvedValueOnce(undefined)
        const service = new UpdateProductUseCase(repository)

        expect(await service.execute({
            id: 'fake-id',
            name: 'fake-name-2',
            price: 60,
        })).toEqual({
            id: 'fake-id',
            name: 'fake-name-2',
            price: 60,
        })
    })
})