import { Locator, Page } from "@playwright/test";

export class Products {


    productsList: Locator
    
    constructor(private page: Page) {

        this.productsList = page.locator(".features_items")
    }


    async clickOnFirstProduct() {

        await this.page.getByRole('link', { name: ' View Product' }).first().click();
    }

    /**
     * helper function
     * used to get the product in product details page
     * (this function returns the box only and is to be used by other functions only)
     */
    getProduct(){

        return this.page.locator(".product-information");
    }


    getItemTitle(){

        return this.getProduct().getByRole("heading");
    }

    getItemCategory(){

        return this.getProduct().getByText("Category")
    }

    getItemQuantity(){

        return this.getProduct().locator('#quantity')
    }

    getItemAvailability(){

        return this.getProduct().getByText('Availability:')
    }
}