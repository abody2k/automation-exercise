import { test } from "../fixtures/global.fixture";
import { goHome } from "../utils/home.util";

test.describe("Home tests go here", () => {



    test("Check the visibility of the categories", async({page}) => {



        await goHome(page);
        
    })
})