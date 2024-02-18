import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { di } from "../../src/di";
import ProductRepository from "../../src/repositories/test.repository";
import ProductModel from "../../src/models/product.model";

const feature = loadFeature("./tests/features/products.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockProduct: ProductRepository;
    let response: supertest.Response;

    test("Get all products", ({ given, when, then }) => {
        given("I want to get all products", () => {
            mockProduct = di.get("ProductRepository");
        });

        when("I send a GET request to /products", async () => {
            response = await request.get("/products");
        });

        then("I should receive a list of products", () => {
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct.getAll());
        });
    });