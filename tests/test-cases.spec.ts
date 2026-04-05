import { expect, test } from "../fixtures/global.fixture";

test.describe("testing test cases page", () => {



    test("verify that test cases page is functional and user can go there", async ({header,page}) => {

        await header.
        await header.goToTestCases();
        await expect(page).toHaveURL(/.*test_cases/);
    })
})