import { getAllProducts } from "../api/products.api";
import { expect, test } from "../fixtures/global.fixture";
import path from "path";
import dotenv from "dotenv"


dotenv.config({ path: path.resolve(__dirname, "./.env") });

test.describe("all products tests go here",()=>{



    test("get all products",async()=>{


        let data = await getAllProducts();

       expect(data.responseCode).toBe(200);
       expect(data.products).toBeTruthy();
        
    })


})