import { Locator, Page } from "@playwright/test";

export class Home {


    categories: Locator
    constructor(private page: Page) {


        this.categories = this.page.locator(".category-products")

    }


    async clickOnWomenCategory() {


        await this.categories.getByText("Women").click();
    }
    async clickOnMenCategory() {

        await this.categories.getByText("Men", { exact: true }).click();
    }

    async clickOnSubCategory(subCategoryName: string, category: string) {

        await this.categories.locator(`#${category}`).getByText(subCategoryName).click();


    }

    getCateogiesTitle() {


        return this.page.locator(".title");
    }


    async scrollToBottomOfPage(){

        await this.page.locator('.footer-bottom').scrollIntoViewIfNeeded()
    }

}