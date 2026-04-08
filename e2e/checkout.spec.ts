import { data } from "../data/account.data";
import { productsNames } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { makeNewAccount } from "../flows/auth.flow";
import { addProductAndProceedToCheckout } from "../flows/products.flow";

test.describe("e2e tests", () => {

    //This is case 23
    test("Verify address details in checkout page after making an account", async ({ home, header, account, page, products, checkout }) => {


        await test.step("Going home", async () => {

            await home.goHome();

        })

        await test.step("Going to sign in/up and making a new account", async () => {


            await makeNewAccount({ account, page, data, header });
            await expect(account.loggedInLabel).toBeVisible();
        })
        await test.step("Adding product and proceeding to checkout", async () => {

            addProductAndProceedToCheckout({ productName: productsNames[0], products })
        })



        await test.step("Checking address info in checkout page", async () => {
            await expect(page).toHaveURL(/.*checkout/)


        })



        await test.step("Deleteing account", async () => {

            await header.DeleteAccount();
            await expect(account.accountDeletedMsg).toBeVisible();
            await account.clickOnContinueAfterDeletingTheAccount();
        })



    })



    //This is case 25
    test("Making a payment and downloading the invoice after making an account", async ({ home, header, account, page, products, checkout }) => {


        await test.step("Going home", async () => {

            await home.goHome();

        })

        await test.step("Going to sign in/up and making a new account", async () => {


            await makeNewAccount({ account, page, data, header });
            await expect(account.loggedInLabel).toBeVisible();
        })
        await test.step("Adding product and proceeding to checkout", async () => {

            //we are at home page right now

            addProductAndProceedToCheckout({ productName: productsNames[0], products })

        })



        await test.step("Checking address info in checkout page", async () => {
            await expect(page).toHaveURL(/.*checkout/)
            let addressType: ["biling", "delivery"] = ["biling", "delivery"]
            for (const address of addressType) {

                await expect(checkout.getFirstNameLastName(address)).toContainText(`${data.firstName} ${data.lastName}`)
                await expect(checkout.getPhoneNumber(address)).toContainText(`${data.mobileNumber}`)
                await expect(checkout.getAddress1Address2(address)).toContainText(`${data.address}`)
                await expect(checkout.getCityStatePostcode(address)).toContainText(`${data.city} ${data.state} ${data.zipCode}`)
                await expect(checkout.getCountry(address)).toContainText(`${data.country}`)
            }

        })



        await test.step("Deleteing account", async () => {

            await header.DeleteAccount();
            await expect(account.accountDeletedMsg).toBeVisible();
            await account.clickOnContinueAfterDeletingTheAccount();
        })



    })

})