import Product from "../../../domain/product/entity/product";

export interface InputListProductDTO {}

export interface OutputListProductDTO {
  products: Product[];
}
