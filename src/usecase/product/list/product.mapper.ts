import Product from "../../../domain/product/entity/product";
import {OutputListProductDTO} from "./list.product.dto";

export class ProductOutputMapper {

    static toOutput(input: Product[]): OutputListProductDTO {
        return {
            products: input.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        }
    }
}