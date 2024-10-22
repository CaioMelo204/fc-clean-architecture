import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {CreateProductUsecase} from "../create/create.product.usecase";
import {FindProductUseCase} from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe('FindProductIntegration', () => {
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

    it("should find the product", async () => {
        const product = new Product('fake-id', 'fake-name', 50)
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const usecase = new FindProductUseCase(productRepository);

        expect(await usecase.execute({
            id: 'fake-id'
        })).toEqual({
            id: 'fake-id',
            name: 'fake-name',
            price: 50
        })
    })
})