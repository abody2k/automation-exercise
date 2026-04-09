import { data } from "../data/account.data";
import { menCategories, womenCategories } from "../data/home.data";
import { productsNames } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { goHome, subscribe } from "../flows/home.flow";

test.describe("Home tests go here", () => {

    test.beforeEach(async ({ page }) => {

        await goHome(page);
    })

    test("Check the visibility of the categories", async ({ page, home }) => {




        await expect(home.categories).toBeVisible();
        await home.clickOnWomenCategory();
        await home.clickOnSubCategory(womenCategories[0], "Women");
        await expect(home.getCateogiesTitle()).toContainText(`Women - ${womenCategories[0]} Products`)

        await home.clickOnMenCategory();
        await home.clickOnSubCategory(menCategories[0], "Men");

        await expect(home.getCateogiesTitle()).toContainText(`Men - ${menCategories[0]} Products`)
    })



    test("adding products from recommendation section", async ({ home, products }) => {

        await home.scrollToBottomOfPage()
        await expect(home.getRecommendedItems()).toBeVisible();
        await products.addProductToCartFromHomePageRecommendations(productsNames[0])
        await products.viewCartAfterAddingItem()
        expect(products.doesItemExistInCart(productsNames[0])).toBeTruthy()
    })

    //case 25
    test("Testing if arrow button scolls up", async ({ home }) => {

        await home.scrollToBottomOfPage();
        // await page.mouse.wheel(0,100000)
        await expect(home.subscriptionField).toBeVisible();
        await home.clickOnArrow();
        await expect(home.fullFledgedFiled).toBeVisible({ timeout: 12000 });// added timeout because of animation

    })



    test("Scrolling up and down without arrows is possible", async ({ home }) => {



        await home.scrollToBottomOfPage();
        await expect(home.subscriptionField).toBeVisible();
        await home.scrollUpToLogo()
        await expect(home.fullFledgedFiled).toBeVisible({ timeout: 12000 });// added timeout because of animation

    })

    //test case 10
    test("User can subscribe", async ({ home }) => {


        await subscribe({ home, data })

    })


    //test case 11
    test("Use ca subscribe from Cart UI", async ({ home, header }) => {



        await header.goToCart();
        await subscribe({ home, data });
    })

})