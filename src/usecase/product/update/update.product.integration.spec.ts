import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {UpdateProductUseCase} from "./update.product.usecase";

describe('UpdateProduct Integration Tests', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should update a product', async () => {
        const product = new Product('fake-id', 'fake-name', 50)
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const service = new UpdateProductUseCase(productRepository);

        expect(await service.execute({
            id: 'fake-id',
            name: 'fake-name-2',
            price: 60
        })).toEqual({
            id: 'fake-id',
            name: 'fake-name-2',
            price: 60,
        })
    })
})