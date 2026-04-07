import { Page, TestType } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Account } from "../pages/account.page";
import path from "path";
import { goHome } from "./home.util";
import { Header } from "../components/header.component";
import { data } from "../data/account.data";



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


export async function goToProductsThroughHome({ page, header }: { page: Page, header: Header }) {


    await goHome(page);
    await header.goToProducts();
    await expect(page).toHaveURL(/.*products/)
}


/**
 * checks if the login error warning is visible or not
 * @param account 
 */
export async function isLoginWarningVisible(account: Account) {

    await expect(account.loginWarningMsg).toBeVisible();
}

export async function saveCurrentLoginState(page: Page) {
    page.context().storageState({ path: path.resolve(__dirname, "../data/login.data.json") })
}

export async function loadLoginState(page: Page) {
    await page.context().setStorageState(path.resolve(__dirname, "../data/login.data.json"))
    // test.use({ storageState: path.resolve(__dirname, "../data/login.data.json") })
}



export async function makeNewAccount(account: Account, page: Page) {
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
}