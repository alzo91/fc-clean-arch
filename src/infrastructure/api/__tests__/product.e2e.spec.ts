import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should not create a new product", async () => {
    const response = await request(app).post("/products").send({
      value: 100,
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const output = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    const response = await request(app).get("/products").send({});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("products");
    expect(response.body.products.length).toBe(1);
    expect(response.body.products[0].name).toBe(output.body.name);
    expect(response.body.products[0].price).toBe(output.body.price);
  });

  it("should be able to find an specific product", async () => {
    const output = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    const response = await request(app)
      .get(`/products/${output.body.id}`)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(output.body.id);
    expect(response.body.name).toBe(output.body.name);
    expect(response.body.price).toBe(output.body.price);
  });

  it("should not find an product if invalid id", async () => {
    const response = await request(app).get(`/products/0`).send({});
    expect(response.status).toBe(404);
  });

  it("should be able to update an existing product", async () => {
    const output = await request(app).post("/products").send({
      name: "Product 1",
      price: 100,
    });

    const response = await request(app)
      .put(`/products/${output.body.id}`)
      .send({
        name: "Product 2",
        price: 200,
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(output.body.id);
    expect(response.body.name).toBe("Product 2");
    expect(response.body.price).toBe(200);
  });
});
