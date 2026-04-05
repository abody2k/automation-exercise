import { getAllbrands, getAllbrandsWithPut, getAllProducts, getAllProductsWithPost, searchForProduct } from "../api/products.api";
import { products } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";

test.describe("all products api tests go here", () => {

    test("get all products", async () => {


        let data = await getAllProducts();

        expect(data.responseCode).toBe(200);
        expect(data.products).toBeTruthy();

    })



    test("get all products with a post", async () => {


        let data = await getAllProductsWithPost();

        expect(data.responseCode).toBe(405);
        expect(data.message).toBe("This request method is not supported.");

    })




    test("get all brands", async () => {


        let data = await getAllbrands();
        console.log(data);

        expect(data.responseCode).toBe(200);
        expect(data.brands).toBeTruthy();

    })


    test("getting brands with put method should not work", async () => {


        let data = await getAllbrandsWithPut();

        expect(data.responseCode).toBe(405);
        expect(data.message).toBe("This request method is not supported.")

    })




    test("Search for a product while providing a product name", async () => {


        let data = await searchForProduct({ search_product: products[0] });

        expect(data.responseCode).toBe(200);
        expect(data.products).toBeTruthy()

    })

    test("Search for a product without providing a product name", async () => {


        let data = await searchForProduct({});

        expect(data.responseCode).toBe(400);
        expect(data.message).toBe("Bad request, search_product parameter is missing in POST request.")

    })
})