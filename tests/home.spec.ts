import { menCategories, womenCategories } from "../data/home.data";
import { productsNames } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("Home tests go here", () => {

    test.beforeEach(async({page})=>{

        await goHome(page);
    })

    test.skip("Check the visibility of the categories", async ({ page, home }) => {



        
        await expect(home.categories).toBeVisible();
        await home.clickOnWomenCategory();
        await home.clickOnSubCategory(womenCategories[0], "Women");
        await expect(home.getCateogiesTitle()).toContainText(`Women - ${womenCategories[0]} Products`)

        await home.clickOnMenCategory();
        await home.clickOnSubCategory(menCategories[0], "Men");

        await expect(home.getCateogiesTitle()).toContainText(`Men - ${menCategories[0]} Products`)
    })



    test.skip("adding products from recommendation section", async ({home,products }) => {

        await home.scrollToBottomOfPage()
        await expect(home.getRecommendedItems()).toBeVisible();
        await products.addProductToCartFromHomePageRecommendations(productsNames[0])
        await products.viewCartAfterAddingItem()
        expect(products.doesItemExistInCart(productsNames[0])).toBeTruthy()
    })

    //case 25
    test.skip("Testing if arrow button scolls up",async ({home})=>{

        await home.scrollToBottomOfPage();
        // await page.mouse.wheel(0,100000)
        await expect(home.subscriptionField).toBeVisible();
        await home.clickOnArrow();
        await expect(home.fullFledgedFiled).toBeVisible({timeout:12000});// added timeout because of animation

    })
})