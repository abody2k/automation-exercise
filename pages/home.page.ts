import { Locator, Page } from "@playwright/test";
import process from "process";

export class Home {


    categories: Locator
    subscriptionField: Locator
    fullFledgedFiled: Locator
    constructor(private page: Page) {


        this.categories = this.page.locator(".category-products")
        this.subscriptionField = this.page.locator("h2").getByText("Subscription")
        this.fullFledgedFiled = this.page.getByText("Full-Fledged practice website for Automation Engineers").first()
    }

    async goHome() {

        await this.page.goto(process.env.BASE_URL)
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


    async scrollToBottomOfPage() {

        await this.page.locator('.footer-bottom').scrollIntoViewIfNeeded()
    }


    getRecommendedItems() {

        return this.page.getByRole('heading', { name: 'recommended items' })
    }


    /**
     * the arrow button that takes the user to the top
     */
    async clickOnArrow() {

        await this.page.locator("#scrollUp").click();
    }


    async scrollUpToLogo() {


        await this.page.locator("#Logo").first().scrollIntoViewIfNeeded();
    }
}