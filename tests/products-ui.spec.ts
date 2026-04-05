import { expect, test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("All products UI tests goes here",()=>{



    test("Verifying all products are visible and interractable",async({page,header,prodcuts})=>{

        await goHome(page);
        await header.goToProducts();
        await expect(page).toHaveURL(/.*products/);
        await expect(prodcuts.productsList).toBeVisible();
        await prodcuts.clickOnFirstProduct();
        await expect(page).toHaveURL(/.*\/product_details\/1/)
        



    })
})