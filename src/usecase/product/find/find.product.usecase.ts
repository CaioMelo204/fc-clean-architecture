import {InputFindProductDto, OutputFindProductDto} from "./find.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export class FindProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(dto: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(dto.id)

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}