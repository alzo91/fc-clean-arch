import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product_one = new Product("123", "Caneta Bic Azul", 2.99);
const product_two = new Product("456", "Keyboard", 59.99);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest
      .fn()
      .mockReturnValue(Promise.resolve([product_one, product_two])),
  };
};

describe("List product unit tests", () => {
  it("should be list product", async () => {
    const productRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const output = await listProductUseCase.execute({});

    expect(output).toHaveProperty("products");
    expect(output.products.length).toBe(2);
  });
});
