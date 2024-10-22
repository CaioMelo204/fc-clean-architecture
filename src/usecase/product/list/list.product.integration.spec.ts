import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {ListProductUseCase} from "./list.product.usecase";

describe('List products Integration', () => {
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


    it("should return a list of Products", async () => {
        const product = new Product('fake-id', 'fake-name', 50)
        const productRepository = new ProductRepository();
        await productRepository.create(product);
        const product2 = new Product('fake-id-2', 'fake-name-2', 60)
        await productRepository.create(product2);

        const service = new ListProductUseCase(productRepository)

        const output = await service.execute({})

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })
})