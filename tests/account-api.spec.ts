import path from "path";
import { apiData, data } from "../data/account.data";
import { test, expect } from "../fixtures/global.fixture";
import dotenv from "dotenv";
import { deleteAccount, getUserAccountDetailByEmail, registerAccount, updateUserAccount, verifyLogin, verifyLoginwithDelete, verifyLoginwithPost } from "../api/account.api";
import { randomInt } from "crypto";







let mydata = {
  name: data.signupUsername,
  email: data.signupEmail + randomInt(100, 1000).toString(27),
  password: data.signupPassword, city: data.city,
  state: data.state, firstname: data.firstName,
  lastname: data.lastName,
  zipcode: data.zipCode, address1: data.address,
  mobile_number: data.mobileNumber,
  birth_date: data.birth_date,
  birth_month: data.birth_month,
  birth_year: data.birth_year,
  country: data.country
}

test.describe("All account API tests goes here", () => {




  test("register account using API only", async ({ }) => {
    apiData.newAccount.email += randomInt(100, 1000).toString(27)
    var context = await registerAccount(apiData.newAccount)

    expect(context.responseCode).toBe(201)
    expect(context.message).toBe("User created!")
  })

  test("Using same email to create an account more than once should not work", { annotation: { type: "edge case", description: "if it fails it means system allows creation of more than 1 account using same email" } }, async ({ }) => {
    let email = data.signupEmailNew + randomInt(100, 1000).toString(27)
    let context = await registerAccount({ name: data.signupUsername, email: email, password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year,country:data.country })
    console.log(context);

    
    expect(context.responseCode).toBe(201) // it is ok if the given data is new so the test should pass

    context = await registerAccount({ name: data.signupUsername, email: email, password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: data.country })

    expect(context.responseCode).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email

  })



  /*I added random characters to email field to avoid using the same email
  as that will generate an error and return 400 status due to duplicate emails
  regardless of the birthdate because the server behaves in a way that creates the account even with faulty birthdate

  */
  test("registering account using invalid birth date info", { annotation: { type: "edge case", description: "if it fails it means system allows creation of more than 1 account using same email" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.invalidBirth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: data.country })

    expect(context.responseCode, "Day is not in the valid range").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  })


  test("registering account using invalid birth month info", { annotation: { type: "edge case", description: "failure means the system allows faulty month input" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.invalidBirth_month, birth_year: data.birth_year, country: data.country })

    expect(context.responseCode, { message: "invalid month (beyond normal range) should not pass the test" }).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email
  })


  test("registering account using invalid year of birth", { annotation: { type: "edge case", description: "failure means the system allows faulty year input" } }, async ({ }) => {

    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.invalidBirth_year, country: data.country })

    expect(context.responseCode, { message: "invalid year (beyond normal range) should not pass the test" }).toBeGreaterThanOrEqual(400); // if it returns ok then test fails as it is not ok to make 2 accounts with the same email
  })


  test("registering account with empty country", { annotation: { type: "edge case", description: "trying to make a new account with passing an empty field for the country parameter" } }, async ({ }) => {


    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: "" })

    expect(context.responseCode, "Day is not in the valid range").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  })

  test("registering account with a country that is not in the list of availables countries", { annotation: { type: "edge case", description: "trying to make an account with non exsisting country in the list" } }, async ({ }) => {


    let context = await registerAccount({ name: data.signupUsername, email: data.signupEmail + randomInt(100, 1000).toString(27), password: data.signupPassword, city: data.city, state: data.state, firstname: data.firstName, lastname: data.lastName, zipcode: data.zipCode, address1: data.address, mobile_number: data.mobileNumber, birth_date: data.birth_date, birth_month: data.birth_month, birth_year: data.birth_year, country: "Iraq" })

    expect(context.responseCode, "the country is not in the list yet it was accepted as an input").toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

  });


  for (const [key, value] of Object.entries(mydata)) {


    test(`registering account without send ${key}`, { annotation: { type: `edge case", description: "registering an account without sending the ${key}` } }, async ({ }) => {
      const typedKey = key as keyof typeof mydata;
      const { [typedKey]: _, ...tempData } = mydata
      let context = await registerAccount(tempData)

      expect(context.responseCode, `the ${key} hasn't been sent yet the account was made`).toBeGreaterThanOrEqual(400) // it is ok if the given data is new so the test should pass

    });

  }


  test(`getting account details by email`, async ({ }) => {

    let s = await getUserAccountDetailByEmail(data.signupEmail);
    console.log(s);
    expect(s.responseCode).toBe(200);

  });



  test(`getting account details without sending an email`, {
    annotation: {


      type: "edge case",
      "description": "it will basically be undefined thus far the result should not point to any account"
    }
  }, async ({ }) => {

    let s = await getUserAccountDetailByEmail();

    expect(s.responseCode, "the API call actually points to a data which is not correct behavior").not.toBe(200);

  });


  test(`updating account`, async ({ }) => {

    let s = await updateUserAccount(apiData.updateAccount);

    expect(s.responseCode, "the API call actually points to a data which is not correct behavior").toBe(200);
    expect(s.message).toBe("User updated!")
  });



  test(`deleting an account using provided email and password`, async ({ }) => {

    let s = await deleteAccount(apiData.deleteAccount.email, apiData.deleteAccount.password);
    console.log(s);

    expect(s.responseCode, "failed deleting data").toBe(200);
    expect(s.message).toBe("Account deleted!")
  });





  test(`verfiy logging in with valid details`, async ({ }) => {

    let s = await verifyLogin(apiData.newAccount.email, apiData.newAccount.password);
    console.log(s);

    expect(s.responseCode, "failed veryfying logging data").toBe(200);

  });

  test(`veryfing  logging in with invalid details`, async ({ }) => {

    let s = await verifyLogin(apiData.newAccount.email, apiData.newAccount.password + " very wrong details");
    console.log(s);

    expect(s.responseCode, "failed veryfying logging data").toBe(404);

  });


  test(`verifying logging in using delete method`, { annotation: { type: "edge case" } }, async ({ }) => {

    let s = await verifyLoginwithDelete();
    console.log(s);

    expect(s.responseCode).toBe(405);

  });



  test(`verifying logging in using post method`, { annotation: { type: "edge case" } }, async ({ }) => {

    let s = await verifyLoginwithPost(apiData.newAccount.password);
    console.log(s);

    expect(s.responseCode).toBe(400);
    expect(s.message).toBe("Bad request, email or password parameter is missing in POST request.");

  });


})