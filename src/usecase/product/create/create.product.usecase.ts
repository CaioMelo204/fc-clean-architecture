import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputCreateProductDto, OutputCreateProductDto} from "./create.product.dto";
import Product from "../../../domain/product/entity/product";
import { v4 as uuid } from "uuid";

export class CreateProductUsecase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(dto: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const newProduct: Product = new Product(uuid(), dto.name, dto.price)

        await this.productRepository.create(newProduct)

        return {
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
        }
    }
}