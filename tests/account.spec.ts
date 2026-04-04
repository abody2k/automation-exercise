import path from "path";
import { data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";
import { goToLoginSingup, isLoginWarningVisible, loadLoginState, login, saveCurrentLoginState } from "../utils/account.util";
import { registerAccount } from "../api/account.api";




dotenv.config({ path: path.resolve(__dirname, "./.env") });


test.describe("All account related tests", () => {



  //this is happy end test
  test.skip("login with correct username and password", async ({ account, page }) => {


    await goToLoginSingup(page, account);

    await login(account, data.loginEmail, data.loginPassword);
    await expect(page).toHaveURL(process.env.BASE_URL as string, { timeout: 10000 });
    await saveCurrentLoginState(page);

  });

  test.skip("login with incorrect username and password", async ({ account, page }) => {

    await goToLoginSingup(page, account);
    await login(account, data.incorrectLoginEmail, data.incorrectLoginPassword);

    await isLoginWarningVisible(account);


  });

  test.skip("login with a combination of correct and incorrect username and password", async ({ account, page }) => {

    await goToLoginSingup(page, account);
    await login(account, data.incorrectLoginEmail, data.loginPassword);

    await isLoginWarningVisible(account);

    await login(account, data.loginEmail, data.incorrectLoginPassword);

    await isLoginWarningVisible(account);


  });

  test.skip("logging in using using saved login data without the use of the login UI", async ({ page, header }) => {

    await loadLoginState(page);
    await page.goto("");
    await expect(header.logout).toBeVisible();
    await expect(header.deleteAccount).toBeVisible();

  })

  //happy end case
  test.skip("signup using correct genuine data", async ({ account, page }) => {

    await goToLoginSingup(page, account);

    await account.enterSignupEmail(data.signupEmail);
    await account.enterSignupUsername(data.signupUsername);
    await account.clickOnSignup(); //clicking here navigates the user to a new page

    await expect(page).toHaveURL(/.*signup/);

    await account.enterFirstName(data.firstName)
    await account.enterLastName(data.lastName)
    await account.enterSignupPassword(data.signupPassword)
    await account.enterAddress(data.address)
    await account.enterCity(data.city)
    await account.enterState(data.state);
    await account.enterZipCode(data.zipCode)
    await account.enterMobileNumber(data.mobileNumber)

    await account.pickDay("7")
    await account.pickMonth("7")
    await account.pickyear("1990")
    await account.createAccount();
    await expect(page).toHaveURL(/.*account_created/)
    //save login info because after making new account you are automatically signed in
    await saveCurrentLoginState(page);


  });


  test("register account using API only",async ({})=>{

   var context = await registerAccount(data.signupUsername,data.signupEmail,data.signupPassword,data.city,data.state,data.firstName,data.lastName,data.zipCode,data.address,data.mobileNumber,data.birth_date,data.birth_month,data.birth_year,data.country,"","","")

   await expect(context).toBeOK()
  })


});