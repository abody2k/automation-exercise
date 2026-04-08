import { data } from "../data/account.data";
import { productsNames } from "../data/products.data";
import { expect, test } from "../fixtures/global.fixture";
import { makeNewAccount } from "../flows/auth.flow";
import { fillPaymentInformation } from "../flows/payments.flow";
import { addProductAndProceedToCheckout, checkIfAdressInfoIsCorrect } from "../flows/products.flow";
import { downloadInvoice } from "../utils/checkout.util";

test.describe("e2e tests", () => {

    //This is case 23
    test.skip("Verify address details in checkout page after making an account", async ({ home, header, account, page, products, checkout }) => {


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
            checkIfAdressInfoIsCorrect({ checkout, data })

        })



        await test.step("Deleteing account", async () => {

            await header.DeleteAccount();
            await expect(account.accountDeletedMsg).toBeVisible();
            await account.clickOnContinueAfterDeletingTheAccount();
        })



    })



    //This is case 26
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
            checkIfAdressInfoIsCorrect({ checkout, data })

        })

        await test.step("Adding a comment then placing the order", async () => {

            await checkout.leaveComment("RANDOM COMMENT")
            await checkout.clickOnPlaceOrder();

        })



        await test.step("Adding a comment then placing the order", async () => {

            await fillPaymentInformation({ checkout, cardNumber: "card", cvc: "123", nameOnCard: "haha", month: "12", year: "2030" })
            await checkout.clickOnPayAndConfirmOrder()
            await expect(checkout.orderPlacedSuccessfullyMsg).toBeVisible()
        })


        await test.step("Download invoice", async () => {

            await downloadInvoice({ checkout, page });
            await checkout.clickOnContinueAfterPaying();

        })


        await test.step("Deleteing account", async () => {

            await header.DeleteAccount();
            await expect(account.accountDeletedMsg).toBeVisible();
            await account.clickOnContinueAfterDeletingTheAccount();
        })



    })

})