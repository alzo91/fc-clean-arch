import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputProductDTO, OutputProductDTO } from "./create.product.dto";

class CreateProductUseCase {
  productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputProductDTO): Promise<OutputProductDTO> {
    const product = ProductFactory.create("a", input.name, input.price);
    await this.productRepository.create(
      new Product(product.id, product.name, product.price)
    );
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export default CreateProductUseCase;
