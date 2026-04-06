import { womenCategories } from "../data/home.data";
import { expect, test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("Home tests go here", () => {



    test("Check the visibility of the categories", async({page,home}) => {



        await goHome(page);
        await expect(home.categories).toBeVisible();
        await home.clickOnWomenCategory();
        await home.clickOnWomenSpecificCategory(womenCategories[0]);
        

    })
})