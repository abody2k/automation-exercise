import { Page } from "@playwright/test";

export async function goHome(page: Page) {


    await page.goto(process.env.BASE_URL)


}