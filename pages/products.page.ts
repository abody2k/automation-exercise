import { Locator, Page } from "@playwright/test";

export class Products {


    productsList: Locator
    constructor(private page: Page) {

        this.productsList = page.locator(".features_items")
    }


    async clickOnFirstProduct() {

        await this.page.getByRole('link', { name: ' View Product' }).first().click();
    }

}