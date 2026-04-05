import { Locator, Page } from "@playwright/test";

export class Products {


    productsList: Locator
    searchField: Locator
    


    constructor(private page: Page) {

        this.productsList = page.locator(".features_items")
        this.searchField = page.getByRole('textbox', { name: 'Search Product' })
    }


    async clickOnFirstProduct() {

        await this.page.getByRole('link', { name: ' View Product' }).first().click();
    }

    /**
     * helper function
     * used to get the product in product details page
     * (this function returns the box only and is to be used by other functions only)
     */
    getProduct() {

        return this.page.locator(".product-information");
    }


    getItemTitle() {

        return this.getProduct().getByRole("heading");
    }

    getItemCategory() {

        return this.getProduct().getByText("Category")
    }

    getItemQuantity() {

        return this.getProduct().locator('#quantity')
    }

    getItemAvailability() {

        return this.getProduct().getByText('Availability:')
    }

    getItemCondition() {

        return this.getProduct().getByText('Condition:')
    }
    getItemBrand() {

        return this.getProduct().getByText('Brand:')
    }

    getItemPrice() {

        return this.getProduct().getByText('Rs.')
    }


    async searchForProduct(productName: string) {

        await this.searchField.click();
        await this.searchField.fill(productName);
        await this.page.locator('#submit_search').click()

    }

    getSearchedProductsLocator(){

        return this.page.getByRole('heading', { name: 'Searched Products' })
    }

    getSearchResult(searchedName:string){

        return this.page.getByText(searchedName)
    }

}