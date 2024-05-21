import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "caneta bic", 2.99);
const input = { id: product.id, name: "caneta bic pro", price: 8.99 };

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn().mockReturnValue(Promise.resolve(product)),
  update: jest.fn().mockReturnValue(Promise.resolve(input)),
});

describe("Product update unit test", () => {
  it("should update an product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
