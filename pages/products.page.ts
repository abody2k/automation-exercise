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

    getSearchedProductsLocator() {

        return this.page.getByRole('heading', { name: 'Searched Products' })
    }

    getSearchResult(searchedName: string) {

        return this.page.getByText(searchedName)
    }



    /**
     * 
     * returns the product from the product list
     * it assumes you are already there in products page and have visible products
     * @param productIndex represents the order of the product from left to right
     * top to bottom
     */
    getProductAddToCartByIndex(productIndex: number) {

        return this.page.locator(".product-overlay").getByText('Add to cart').nth(productIndex)
    }


    
    /**
     * click on add to cart, assumes you are already in the products page
     * @param productIndex the index of the product from top left starting from 0
     * and ending at the bottom right as the last index
     */
    async addProductToCart(productIndex : number){
        await this.getProductAddToCartByIndex(productIndex).click();
    }

}