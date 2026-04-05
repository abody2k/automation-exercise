import { search } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { goToProductsThroughHome } from "../utils/account.util";
import { goHome } from "../utils/home.util";

test.describe("All products UI tests goes here", () => {



    test("Verifying all products are visible and interractable", async ({ page, header, prodcuts }) => {

        await goToProductsThroughHome({ page, header });
        await expect(page).toHaveURL(/.*products/);
        await expect(prodcuts.productsList).toBeVisible();
        await prodcuts.clickOnFirstProduct();
        await expect(page).toHaveURL(/.*\/product_details\/1/)
        let items = [prodcuts.getItemAvailability()
            , prodcuts.getItemBrand()
            , prodcuts.getItemCategory()
            , prodcuts.getItemCondition()
            , prodcuts.getItemPrice()
            , prodcuts.getItemQuantity()
            , prodcuts.getItemTitle()]

        for (let i = 0; i < items.length; i++) {

            await expect(items[i]).toBeVisible();
        }




    })


    test("Verifying if searching for a product actually works", async ({ prodcuts, page, header }) => {

        await goToProductsThroughHome({ page, header });
        await prodcuts.searchForProduct(search) // assuming dress already exist
        await expect(prodcuts.getSearchedProductsLocator()).toBeVisible();
        expect(await prodcuts.getSearchResult(search).count()).toBeGreaterThanOrEqual(1)

    })
})