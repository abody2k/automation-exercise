import path from "path";
import { data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";
import { goToLoginSingup, isLoginWarningVisible, login } from "../utils/account.util";




dotenv.config({ path: path.resolve(__dirname, "../.env") });


test.describe("All account related tests", () => {



  //this is happy end test
  test("login with correct username and password", async ({ account, page }) => {


    await goToLoginSingup(page, account);

    await login(account, data.loginEmail, data.loginPassword);
    await expect(page).toHaveURL(process.env.BASE_URL as string, { timeout: 10000 });

  });

  test("login with incorrect username and password", async ({ account, page }) => {

    await goToLoginSingup(page, account);
    await login(account, data.incorrectLoginEmail, data.incorrectLoginPassword);

    await isLoginWarningVisible(account);


  });

  test("login with a combination of correct and incorrect username and password", async ({ account, page }) => {

    await goToLoginSingup(page, account);
    await login(account, data.incorrectLoginEmail, data.loginPassword);

    await isLoginWarningVisible(account);

    await login(account, data.loginEmail, data.incorrectLoginPassword);

    await isLoginWarningVisible(account);


  });


});