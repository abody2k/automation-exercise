import { getAllProducts } from "../api/products.api";
import { expect, test } from "../fixtures/global.fixture";

test.describe("all products tests go here",()=>{



    test("get all products",async()=>{


        let data = await getAllProducts();

       expect(data.responseCode).toBe(200);
       expect(data.products).toBeTruthy();
        
    })


})