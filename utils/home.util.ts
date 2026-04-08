import { Page } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Home } from "../pages/home.page";

export async function goHome(page: Page) {


    await page.goto(process.env.BASE_URL)


}

export async function subscribe({home,data}:{home:Home,data:{loginEmail:string}}) {

    await home.EnterEmailForSubscription(data.loginEmail)
    await home.subscribe();
    await expect(home.subscriptionSuccessMsg).toBeVisible();
}