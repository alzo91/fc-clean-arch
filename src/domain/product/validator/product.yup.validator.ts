import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as Yup from "yup";

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      Yup.object()
        .shape({
          id: Yup.string().required("Id is required"),
          name: Yup.string().required("Name is required"),
          price: Yup.number().min(0, "Price must be greater than zero"),
          //   .lessThan(0, "Price must be greater than zero")
          //   .required("Price is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          { abortEarly: true }
        );
    } catch (err) {
      const e = err as Yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
