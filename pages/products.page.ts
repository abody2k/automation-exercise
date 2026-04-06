import { Locator, Page } from "@playwright/test";

export class Products {


    productsList: Locator
    searchField: Locator
    continueShopping: Locator



    constructor(private page: Page) {

        this.productsList = page.locator(".features_items")
        this.searchField = page.getByRole('textbox', { name: 'Search Product' })
        this.continueShopping = this.page.getByRole('button', { name: 'Continue Shopping' })
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
        // locator(".product-overlay").getByText('Add to cart').nth(productIndex) THIS IS USED TO get the overlay
        return this.page.locator(".productinfo").getByText("Add to cart").nth(productIndex)
    }



    /**
     * click on add to cart, assumes you are already in the products page
     * @param productIndex the index of the product from top left starting from 0
     * and ending at the bottom right as the last index
     */
    async addProductToCart(productIndex: number) {
        let product = this.getProductAddToCartByIndex(productIndex);
        await product.hover();
        await this.getProductAddToCartByIndex(productIndex).click();
    }


    async clickOnContinueShopping() {

        await this.continueShopping.click();

    }

    async viewCartAfterAddingItem() {

        await this.page.getByRole('link', { name: 'View Cart' }).click();
    }

    /**
     * returns an array of objects that has name, price, quantity and total
     */
    async getInfoOfItemsInTheCart() {

        let allLocators = await this.page.locator("tr").all()
        if (allLocators.length > 0) {
            allLocators = allLocators.filter((locator, index) => {
                return index != 0;
            })
        }

        let data = [];

        for (let i = 0; i < allLocators.length; i++) {
            const productDetails: {
                productName?: string,
                productPrice?: number,
                productQuantity?: number,
                productTotal?: number
            } = {

            }

            productDetails.productName = await allLocators[i].locator(".cart_description").getByRole("link").textContent() ?? ""
            productDetails.productPrice = Number((await allLocators[i].locator(".cart_price").textContent())?.split(" ")[1]) ?? 0
            productDetails.productQuantity = Number((await allLocators[i].locator(".cart_quantity").textContent())) ?? 0
            productDetails.productTotal = Number((await allLocators[i].locator(".cart_total_price").textContent())?.split(" ")[1]) ?? 0

            data.push(productDetails)

        }

        return data;
    }

}