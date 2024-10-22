import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {InputUpdateProductDto, OutputUpdateProductDto} from "./update.product.dto";

export class UpdateProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(dto: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(dto.id)

        product.changeName(dto.name)
        product.changePrice(dto.price)

        await this.productRepository.update(product)

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}