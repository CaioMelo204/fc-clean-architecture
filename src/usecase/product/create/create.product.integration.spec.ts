import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import {CreateProductUsecase} from "./create.product.usecase";

describe("Create Product", () => {
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

    it("should create a new product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUsecase(productRepository);

        expect(await usecase.execute({
            name: 'name-test',
            price: 50
        })).toEqual({
            id: expect.any(String),
            name: 'name-test',
            price: 50
        })
    })
})