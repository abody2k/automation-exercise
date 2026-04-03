import { Page } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Account } from "../pages/account.page";



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