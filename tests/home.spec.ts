import { menCategories, womenCategories } from "../data/home.data";
import { expect, test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("Home tests go here", () => {



    test("Check the visibility of the categories", async({page,home}) => {



        await goHome(page);
        await expect(home.categories).toBeVisible();
        await home.clickOnWomenCategory();
        await home.clickOnSubCategory(womenCategories[0],"Women");
        await expect(home.getCateogiesTitle()).toContainText(`Women - ${womenCategories[0]} Products`)

        await home.clickOnMenCategory();
        await home.clickOnSubCategory(menCategories[0],"Men");

        await expect(home.getCateogiesTitle()).toContainText(`Men - ${menCategories[0]} Products`)
    })
})