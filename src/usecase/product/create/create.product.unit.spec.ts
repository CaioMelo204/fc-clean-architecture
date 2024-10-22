import {CreateProductUsecase} from "./create.product.usecase";

describe("Create Product", () => {
    const repository: any = jest.fn();

    it("should create a repository", async () => {
        repository.create = jest.fn().mockResolvedValueOnce(undefined);

        const service = new CreateProductUsecase(repository);

        expect(await service.execute({
            name: 'name-test',
            price: 50,
        })).toEqual({
            id: expect.any(String),
            name: 'name-test',
            price: 50,
        })
    })
})