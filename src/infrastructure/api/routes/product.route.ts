import express, {Response, Request} from "express";
import {CreateProductUsecase} from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import {InputCreateProductDto} from "../../../usecase/product/create/create.product.dto";
import {ListProductUseCase} from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUsecase(new ProductRepository())

    try {
        const createProductDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price,
        }

        const output = await useCase.execute(createProductDto);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUseCase(new ProductRepository())

    try {
        const output = await useCase.execute({});
        res.send(output)
    } catch (err) {
        res.status(500).send(err);
    }
})