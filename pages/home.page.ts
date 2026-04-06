import { Locator, Page } from "@playwright/test";

export class Home {


    categories: Locator
    constructor(private page: Page) {


        this.categories = this.page.locator(".category-products")

    }


    async clickOnWomenCategory() {


        await this.categories.getByText("Women").click();
    }

    async clickOnWomenSpecificCategory(categoryName : string){

        await this.categories.getByText(categoryName).click();


    }

}