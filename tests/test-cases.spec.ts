import { expect, test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("testing test cases page", () => {



    test("verify that test cases page is functional and user can go there", async ({header,page}) => {

        await goHome(page);
        await header.goToTestCases();
        await expect(page).toHaveURL(/.*test_cases/);
    })
})