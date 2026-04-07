import { data } from "../data/account.data";
import { brands, itemsToBuy, productsNames, reviewData, search } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { goToProductsThroughHome } from "../utils/account.util";
import { goHome } from "../utils/home.util";
import { addProductAndWaitForAffirmationUI, addProductByNameAndWaitForAffirmationUI } from "../utils/products.util";

test.describe("All products UI test.skips goes here", () => {


    test.beforeEach(async ({ page, header }) => {

        await goToProductsThroughHome({ page, header });


    })

    test.skip("Verifying all products are visible and interractable", async ({ page, header, products }) => {

        await expect(page).toHaveURL(/.*products/);
        await expect(products.productsList).toBeVisible();
        await products.clickOnFirstProduct();
        await expect(page).toHaveURL(/.*\/product_details\/1/)
        let items = [products.getItemAvailability()
            , products.getItemBrand()
            , products.getItemCategory()
            , products.getItemCondition()
            , products.getItemPrice()
            , products.getItemQuantity()
            , products.getItemTitle()]

        for (let i = 0; i < items.length; i++) {

            await expect(items[i]).toBeVisible();
        }




    })


    test.skip("Verifying if searching for a product actually works", async ({ products, page, header }) => {

        await products.searchForProduct(search) // assuming dress already exist
        await expect(products.getSearchedProductsLocator()).toBeVisible();
        expect(await products.getSearchResult(search).count()).toBeGreaterThanOrEqual(1)

    })


    test.skip("Adding 2 items to the cart and verifying that the cart contains the right info", async ({ products, page, header }) => {


        //the flow requires adding both the first and the second product to the cart


        await products.addProductToCart(0);  //adding the first one
        await products.clickOnContinueShopping();
        await products.addProductToCart(1);  //adding the second one
        await products.viewCartAfterAddingItem();
        await expect(page).toHaveURL(/.*\/view_cart/)
        let productsInfo = await products.getInfoOfItemsInTheCart();

        expect(productsInfo.length).toBe(2);

        for (let i = 0; i < productsInfo.length; i++) {
            expect(productsInfo[i].productQuantity!).toBe(1); // test is all about adding one item after all so we need to check if it is actually 1
            expect(productsInfo[i].productQuantity! * productsInfo[i].productPrice!).toEqual(productsInfo[i].productTotal)
        }


    })


    test.skip("Verifying quantity after adding the same item multiple times to the Cart", async ({ page, products }) => {


        for (let i = 0; i < 4; i++) {

            await addProductAndWaitForAffirmationUI(products, 0);
            if (i < 3)
                await products.clickOnContinueShopping();
            else
                await products.viewCartAfterAddingItem();
        }

        let items = await products.getInfoOfItemsInTheCart();

        expect(items.length).toBe(1);
        expect(items[0].productQuantity).toBe(4);



    })


    test.skip("Remove Items from Cart", async ({ products }) => {


        await addProductByNameAndWaitForAffirmationUI(products, search);
        await products.viewCartAfterAddingItem();
        await expect(products.doesItemExistInCart(search)).toBeVisible()
        await products.removeItemFromCart(search);
        await expect(products.doesItemExistInCart(search)).not.toBeVisible()


    })


    test.skip("Check if brands browsing works well", async ({ products, page }) => {



        await expect(products.brands).toBeVisible(); //check if it is visible
        expect(await products.brandsListsSize()).toBeGreaterThan(0); // check if there is any brand at all

        for (let i = 0; i < 2; i++) {
            await products.clickOnBrand(brands[i]);


            await expect(page).toHaveURL(process.env.BASE_URL + `/brand_products/${brands[i]}`)
        }



    })



    test.skip("Testing if items remain in cart after logging in", async ({ products, page, account, header }) => {



        for (let i = 0; i < itemsToBuy.length; i++) {
            await products.searchForProduct(itemsToBuy[i]);
            await products.addProductToCartByName(itemsToBuy[i]);
            if (i == itemsToBuy.length - 1) {
                await products.viewCartAfterAddingItem();
            } else {
                await products.clickOnContinueShopping();
            }
        }

        await expect(page).toHaveURL(/.*view_cart/)
        for (let i = 0; i < itemsToBuy.length; i++) {
            expect(products.doesItemExistInCart(itemsToBuy[i])).toBeTruthy()

        }

        await header.goToSignupLogin();
        await account.enterEmailForLogin(data.loginEmail)
        await account.enterPasswordForLogin(data.loginPassword)
        await account.login();
        await header.goToCart();
        await expect(page).toHaveURL(/.*view_cart/)


        for (let i = 0; i < itemsToBuy.length; i++) {
            expect(products.doesItemExistInCart(itemsToBuy[i])).toBeTruthy()

        }

    })



    test("Checking if viewing a product and adding a review works", async ({ products }) => {



        await products.viewProduct(productsNames[0]);
        await expect(products.returnWriteYourReview()).toBeVisible();
        await products.fillReviewName(reviewData.name)
        await products.fillReviewEmail(reviewData.email);
        await products.fillReviewMsg(reviewData.message);
        await products.submitReview();
        await expect(products.getSuccessMessage()).toBeVisible();

    })

})