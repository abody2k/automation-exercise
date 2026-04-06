import { Locator, Page } from "@playwright/test";

export class Home {


    categories: Locator
    constructor(private page: Page) {


        this.categories = this.page.locator(".category-products")

    }

    

}