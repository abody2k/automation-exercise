import { Page, TestType } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Account } from "../pages/account.page";
import path from "path";
















export async function loadLoginState(page: Page) {
    await page.context().setStorageState(path.resolve(__dirname, "../data/login.data.json"))
    // test.use({ storageState: path.resolve(__dirname, "../data/login.data.json") })
}



