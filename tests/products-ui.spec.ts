import { search } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { goToProductsThroughHome } from "../utils/account.util";
import { goHome } from "../utils/home.util";

test.describe("All products UI test.skips goes here", () => {



    test.skip("Verifying all products are visible and interractable", async ({ page, header, prodcuts }) => {

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


    test.skip("Verifying if searching for a product actually works", async ({ prodcuts, page, header }) => {

        await goToProductsThroughHome({ page, header });
        await prodcuts.searchForProduct(search) // assuming dress already exist
        await expect(prodcuts.getSearchedProductsLocator()).toBeVisible();
        expect(await prodcuts.getSearchResult(search).count()).toBeGreaterThanOrEqual(1)

    })


    test("Adding 2 items to the cart and verifying that the cart contains the right info", async ({ prodcuts, page, header }) => {


        //the flow requires adding both the first and the second product to the cart

        await goToProductsThroughHome({ page, header });
        await prodcuts.addProductToCart(0);  //adding the first one
        await prodcuts.clickOnContinueShopping();
        await prodcuts.addProductToCart(1);  //adding the second one
        await prodcuts.viewCartAfterAddingItem();
        await expect(page).toHaveURL(/.*\/view_cart/)
        let productsInfo = await prodcuts.getInfoOfItemsInTheCart();

        expect(productsInfo.length).toBe(2);

        for (let i =0;i< productsInfo.length;i++){
            expect(productsInfo[i].productQuantity!).toBe(1); // test is all about adding one item after all so we need to check if it is actually 1
            expect(productsInfo[i].productQuantity! * productsInfo[i].productPrice! ).toEqual(productsInfo[i].productTotal)
        }


    })
})