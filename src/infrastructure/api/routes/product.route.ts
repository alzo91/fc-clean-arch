import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const createProductUseCase = new CreateProductUseCase(
    new ProductRepository()
  );

  try {
    const output = await createProductUseCase.execute({
      name: req.body.name,
      price: req.body.price,
    });
    res.status(201).send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.status(200).send(output);
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  try {
    const usecase = new FindProductUseCase(new ProductRepository());
    const output = await usecase.execute({ id: req.params.id });

    res.status(200).send(output);
  } catch (error) {
    res.status(404).send(error);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  try {
    const usecase = new UpdateProductUseCase(new ProductRepository());
    const output = await usecase.execute({
      id: req.params.id,
      name: req.body.name,
      price: req.body.price,
    });

    res.status(200).send(output);
  } catch (error) {
    res.status(404).send(error);
  }
});
