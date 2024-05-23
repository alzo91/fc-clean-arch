export interface InputListProductDTO {}

export interface ProductDTO {
  id: string;
  name: string;
  price: number;
}
export interface OutputListProductDTO {
  products: ProductDTO[];
}
