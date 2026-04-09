import { Page, TestType } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Account } from "../pages/account.page";
import path from "path";
import { goHome } from "./home.util";
import { Header } from "../components/header.component";









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



