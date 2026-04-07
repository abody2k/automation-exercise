import { menCategories, womenCategories } from "../data/home.data";
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



    test("adding products from recommendation section", async ({home,products }) => {

        await home.scrollToBottomOfPage()
        

    })
})