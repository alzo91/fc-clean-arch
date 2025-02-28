import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

class FindProductUseCase {
  productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    if (!input.id) {
      throw new Error("invalid argument");
    }
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}

export default FindProductUseCase;
