import { Locator, Page } from "@playwright/test";

export class Checkout{

    addressDelivery : Locator
    constructor(private page: Page){

        this.addressDelivery = page.locator("#address_delivery")
    }

    /**
     * it is going to be separated by space as in firstname lastname
     * @returns locator of the corresponding field
     */
    getFirstNameLastNameInDeliveryAddress(){


        return this.addressDelivery.locator(".address_firstname")
    }

    getCityStatePostcodeInDeliveryAddress(){


        return this.addressDelivery.locator(".address_city")
    }

}