import { Page } from "@playwright/test";
import { Header } from "../components/header.component";
import { Account } from "../pages/account.page";
import { expect } from "../fixtures/global.fixture";
import path from "node:path";

export async function makeNewAccount({ account, page, data, header }: { account: Account, header: Header, page: Page, data: { signupEmail: string, signupUsername: string, firstName: string, lastName: string, signupPassword: string, address: string, city: string, country: string, state: string, zipCode: string, mobileNumber: string, birth_date: string, birth_month: string, birth_year: string } }) {

    await header.goToSignupLogin();
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
    await account.selectCountry(data.country)
    await account.pickDay(data.birth_date)
    await account.pickMonth(data.birth_month)
    await account.pickyear(data.birth_year)
    await account.createAccount();
    await expect(page).toHaveURL(/.*account_created/)
    await account.clickOnContinueAfterMakingAccount();
}



/**
 * a helper function that goes to login page and uses email and password to login
 * @param account the account object that you got from test
 * @param email 
 * @param password 
 */
export async function login(account: Account, email: string, password: string) {


    await account.enterEmailForLogin(email)
    await account.enterPasswordForLogin(password);
    await account.login();

}



export async function goToLoginSingup(page: Page, account: Account) {
    await account.gotoLoginSignup();


    //the user should stay there without redirection

    await expect(page).toHaveURL(/.*login/);
}



/**
 * checks if the login error warning is visible or not
 * @param account 
 */
export async function isLoginWarningVisible(account: Account) {

    await expect(account.loginWarningMsg).toBeVisible();
}



export async function saveCurrentLoginState(page: Page) {
    await page.context().storageState({ path: path.resolve(__dirname, "../data/login.data.json") })
}




export async function loadLoginState(page: Page) {
    await page.context().setStorageState(path.resolve(__dirname, "../data/login.data.json"))
    // test.use({ storageState: path.resolve(__dirname, "../data/login.data.json") })
}

