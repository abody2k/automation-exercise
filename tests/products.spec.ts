import { getAllProducts, getAllProductsWithPost } from "../api/products.api";
import { expect, test } from "../fixtures/global.fixture";

test.describe("all products tests go here", () => {

    test.skip("get all products", async () => {


        let data = await getAllProducts();

        expect(data.responseCode).toBe(200);
        expect(data.products).toBeTruthy();

    })



    test("get all products with a post", async () => {


        let data = await getAllProductsWithPost();

        expect(data.responseCode).toBe(405);
        expect(data.message).toBe("This request method is not supported.");

    })

})