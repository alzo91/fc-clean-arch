import { Sequelize } from "sequelize-typescript";

import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("List product integration tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be list product", async () => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);

    const product_one = new Product("123", "Caneta Bic Azul", 2.99);
    await productRepository.create(product_one);

    const product_two = new Product("456", "Keyboard", 59.99);
    await productRepository.create(product_two);

    const output = await listProductUseCase.execute({});

    expect(output).toHaveProperty("products");
    expect(output.products.length).toBe(2);
  });
});
