import { Sequelize } from "sequelize-typescript";

import Product from "../../../domain/product/entity/product";

import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product integration", () => {
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

  it("should find a customer", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "keyboard", 59.9);
    await productRepository.create(product);

    const input = {
      id: product.id,
    };

    const output = {
      id: "123",
      name: "keyboard",
      price: 59.9,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
