import path from "path";
import { apiData, data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";
import { goToLoginSingup, isLoginWarningVisible, loadLoginState, login, saveCurrentLoginState } from "../utils/account.util";
import { getUserAccountDetailByEmail, registerAccount, updateUserAccount } from "../api/account.api";
import { randomInt } from "crypto";




dotenv.config({ path: path.resolve(__dirname, "./.env") });


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


  test.skip("register account using API only", async ({ }) => {

    var context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: data.country })

    expect(context).toBe(201)
  })

  test.skip("Using same email to create an account more than once should not work", { annotation: { type: "edge case", description: "if it fails it means system allows creation of more than 1 account using same email" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmailNew + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year })

    expect(context).toBe(201) // it is ok if the given data is new so the test should pass

    context = await registerAccount({ name: data.signupUsername, email: data.signupEmailNew + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: data.country })

    expect(context).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email

  })



  /*I added random characters to email field to avoid using the same email
  as that will generate an error and return 400 status due to duplicate emails
  regardless of the birthdate because the server behaves in a way that creates the account even with faulty birthdate

  */
  test.skip("registering account using invalid birth date info", { annotation: { type: "edge case", description: "if it fails it means system allows creation of more than 1 account using same email" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.invalidBirth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: data.country })

    expect(context, "Day is not in the valid range").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  })


  test.skip("registering account using invalid birth month info", { annotation: { type: "edge case", description: "failure means the system allows faulty month input" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.invalidBirth_month, birth_year: data.birth_year, country: data.country })

    expect(context, { message: "invalid month (beyond normal range) should not pass the test" }).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email
  })


  test.skip("registering account using invalid year of birth", { annotation: { type: "edge case", description: "failure means the system allows faulty year input" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.invalidBirth_year, country: data.country })

    expect(context, { message: "invalid year (beyond normal range) should not pass the test" }).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email
  })


  test.skip("registering account with empty country", { annotation: { type: "edge case", description: "trying to make a new account with passing an empty field for the country parameter" } }, async ({ }) => {


    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: "" })

    expect(context, "Day is not in the valid range").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  })

  test.skip("registering account with a country that is not in the list of availables countries", { annotation: { type: "edge case", description: "trying to make an account with non exsisting country in the list" } }, async ({ }) => {


    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstName: data.firstName, lastName: data.lastName, zipcode: data.zipCode, address1: data.address, mobileNumber: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: "Iraq" })

    expect(context, "the country is not in the list yet it was accepted as an input").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  });


  for (const [key, value] of Object.entries(mydata)) {


  test.skip(`registering account without send ${key}`, { annotation: { type: `edge case", description: "registering an account without sending the ${key}` } }, async ({ }) => {
    const typedKey = key as keyof typeof mydata;
    const { [typedKey]: _, ...tempData } = mydata
    let context = await registerAccount(tempData)

    expect(context, `the ${key} hasn't been sent yet the account was made`).toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  });

}


  test(`getting account details by email`, async ({ }) => {

    let s = await getUserAccountDetailByEmail(data.signupEmail);
    console.log(s);
    expect(s.responseCode).toBe(200);

  });



    test.skip(`getting account details without sending an email`,{annotation:{


      type:"edge case",
      "description":"it will basically be undefined thus far the result should not point to any account"
    }}, async ({ }) => {

    let s = await getUserAccountDetailByEmail();
    
    expect(s.responseCode,"the API call actually points to a data which is not correct behavior").not.toBe(200);
    
  });


    test(`updating account`, async ({ }) => {

    let s = await updateUserAccount(apiData.updateAccount);
      console.log(s);
      
    expect(s.responseCode,"the API call actually points to a data which is not correct behavior").toBe(200);
    
  });

});