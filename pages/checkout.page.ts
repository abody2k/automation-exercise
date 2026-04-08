import { Locator, Page } from "@playwright/test";

export class Checkout {


    addressDelivery: Locator
    orderPlacedSuccessfullyMsg: Locator 

    constructor(private page: Page) {

        this.addressDelivery = page.locator("#address_delivery")
        this.orderPlacedSuccessfullyMsg = page.getByText("Your order has been placed successfully").first()
    }

    /**
     * it is going to be separated by space as in firstname lastname
     * @returns locator of the corresponding field
     */
    getFirstNameLastName(type: "biling" | "delivery") {


        return this.getLocatorUsingAddressDelivery(".address_firstname", type)
    }

    getCityStatePostcode(type: "biling" | "delivery") {


        return this.getLocatorUsingAddressDelivery(".address_city", type)
    }


    getCountry(type: "biling" | "delivery") {


        return this.getLocatorUsingAddressDelivery(".address_country_name", type)
    }

    getPhoneNumber(type: "biling" | "delivery") {


        return this.getLocatorUsingAddressDelivery(".address_phone", type)
    }


    getAddress1Address2(type: "biling" | "delivery") {


        return this.getLocatorUsingAddressDelivery(".address_address1", type).nth(1) // for some reason, the dev decided to duplicate the field 3 times so the right one is the second field hence the nth(1)
    }

    getLocatorUsingAddressDelivery(locator_class: string, type: "biling" | "delivery") {
        this.changeAddress(type)
        return this.addressDelivery.locator(locator_class)
    }

    /**
     * a function that switches between delivery and biling address
     * every time you call it, it switches between the two
     * the inital value points to delivery address.
     * use it when you want to get the locator of the address info in
     * the other container
     */
    changeAddress(type: "biling" | "delivery") {

        this.addressDelivery = type == "biling" ? this.page.locator("#address_invoice") : this.page.locator("#address_delivery")

    }


    async leaveComment(comment: string) {

        await this.page.locator('textarea[name="message"]').fill(comment);
    }

    async clickOnPlaceOrder() {
        await this.page.getByRole('link', { name: 'Place Order' }).click()
    }


    async fillNameOnCard(name: string) {
        await this.page.locator('input[name="name_on_card"]').fill(name)
    }


    async fillCardNumber(number: string) {
        await this.page.locator('input[name="card_number"]').fill(number)
    }

    async fillCvc(cvc: string) {
        await this.page.getByRole('textbox', { name: 'ex.' }).fill(cvc)
    }



    /**
     * 
     * @param month 2 digits as in 12
     */
    async fillMonth(month: string) {
        await this.page.getByRole('textbox', { name: 'MM' }).fill(month)
    }




    /**
     * 
     * @param year 4 digits as in 2030
     */
    async fillYear(year: string) {

        await this.page.getByRole('textbox', { name: 'YYYY' }).fill(year)
    }






    async clickOnPayAndConfirmOrder() {


        await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    }




    async clickOnDownloadInvoice() {

        await this.page.getByRole('link', { name: 'Download Invoice' }).click();

    }



    async clickOnContinueAfterPaying() {

        await this.page.getByRole('link', { name: 'Continue' }).click();
    }

}