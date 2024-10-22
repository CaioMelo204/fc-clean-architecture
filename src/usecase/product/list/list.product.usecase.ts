import {InputListProductDTO, OutputListProductDTO} from "./list.product.dto";
import {ProductOutputMapper} from "./product.mapper";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(dto: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.productRepository.findAll()

        return ProductOutputMapper.toOutput(products)
    }
}