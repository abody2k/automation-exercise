import path from "path";
import { data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";
import { login } from "../utils/account.util";




dotenv.config({ path: path.resolve(__dirname, "../.env") });


test.describe("All account related tests", () => {



  //this is happy end test
  test("login with correct username and password", async ({ account, page }) => {


    await login(account,page,data.loginEmail,data.loginPassword);
    await expect(page).toHaveURL(process.env.BASE_URL as string, { timeout: 10000 });

  })

  test("login with incorrect username and password", async ({ account, page }) => {


    await login(account,page,data.incorrectLoginEmail,data.incorrectLoginPassword);

    await expect(account.loginWarningMsg).toBeVisible();

    

  })


});