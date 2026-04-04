import { getAllbrands, getAllbrandsWithPut, getAllProducts, getAllProductsWithPost } from "../api/products.api";
import { expect, test } from "../fixtures/global.fixture";

test.describe("all products tests go here", () => {

    test.skip("get all products", async () => {


        let data = await getAllProducts();

        expect(data.responseCode).toBe(200);
        expect(data.products).toBeTruthy();

    })



    test.skip("get all products with a post", async () => {


        let data = await getAllProductsWithPost();

        expect(data.responseCode).toBe(405);
        expect(data.message).toBe("This request method is not supported.");

    })




    test.skip("get all brands", async () => {


        let data = await getAllbrands();
        console.log(data);

        expect(data.responseCode).toBe(200);
        expect(data.brands).toBeTruthy();

    })


    test("getting brands with post method should not work", async () => {


        let data = await getAllbrandsWithPut();

        expect(data.responseCode).toBe(405);
        expect(data.message).toBe("This request method is not supported.")

    })
})