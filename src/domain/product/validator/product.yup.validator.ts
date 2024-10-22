import Product from "../entity/product";
import * as yup from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";

export class ProductYupValidator implements ValidatorInterface<Product>{
     validate(product: Product) {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().min(0, 'Price must be greater than zero').required("Price is required"),
                })
                .validateSync(
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                    },
                    {
                        abortEarly: false,
                    }
                );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                product.notification.addError({
                    context: "customer",
                    message: error,
                });
            });
        }
    }
}