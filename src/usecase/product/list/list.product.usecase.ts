import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

class ListProductUseCase {
  productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}

export default ListProductUseCase;
