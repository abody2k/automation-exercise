import path from "path";
import { data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";




dotenv.config({ path: path.resolve(__dirname, "../.env") });


test.describe("All account related tests", () => {



  //this is happy end test
  test("login with correct username and password", async ({ account, page }) => {

    await account.gotoLoginSignup();


    //the user should stay there without redirection

    await expect(page).toHaveURL(/.*login/);

    await account.enterEmailForLogin(data.loginEmail)
    await account.enterPasswordForLogin(data.loginPassword);
    await account.login();

    await expect(page).toHaveURL(process.env.BASE_URL as string, { timeout: 10000 });

  })


});