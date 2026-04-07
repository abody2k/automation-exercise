import { data } from "../data/account.data";
import { productsNames } from "../data/products.data";
import { test, expect } from "../fixtures/global.fixture";
import { goToLoginSingup, isLoginWarningVisible, loadLoginState, login, makeNewAccount, saveCurrentLoginState } from "../utils/account.util";
import { randomInt } from "crypto";







let mydata = {
  name: data.signupUsername,
  email: data.signupEmail + randomInt(100, 1000).toString(27),
  password: data.signupPassword, city: data.city,
  state: data.state, firstName: data.firstName,
  lastName: data.lastName,
  zipcode: data.zipCode, address1: data.address,
  mobileNumber: data.mobileNumber,
  birth_date: data.birth_date,
  birth_month: data.birth_month,
  birth_year: data.birth_year,
  country: data.country
}



test.describe("All account UI related test.skips", () => {



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

    await makeNewAccount(account, page);
    //save login info because after making new account you are automatically signed in
    await saveCurrentLoginState(page);


  });


  //This is case 23
  test("Verify address details in checkout page after making an account", async ({ home, header, account, page, products, checkout }) => {

    await home.goHome();
    await header.goToSignupLogin();
    await makeNewAccount(account, page);

    await account.clickOnContinueAfterMakingAccount();
    await expect(account.loggedInLabel).toBeVisible();

    //we are at home page right now

    await products.addProductToCartByName(productsNames[0])
    await products.viewCartAfterAddingItem();
    await products.clickOnProceedToCheckout();

    await expect(page).toHaveURL(/.*checkout/)

    for (let i = 0; i < 2; i++) {

      await expect(checkout.getFirstNameLastName()).toContainText(`${data.firstName} ${data.lastName}`)
      await expect(checkout.getPhoneNumber()).toContainText(`${data.mobileNumber}`)
      await expect(checkout.getAddress1Address2()).toContainText(`${data.address}`)
      await expect(checkout.getCityStatePostcode()).toContainText(`${data.city} ${data.state} ${data.zipCode}`)
      await expect(checkout.getCountry()).toContainText(`${data.country}`)
      checkout.changeAddress();
    }

    await header.DeleteAccount();
    

  })


});