import { Locator, Page } from "@playwright/test";

export class Checkout{

    addressDelivery : Locator
    constructor(private page: Page){

        this.addressDelivery = page.locator("#address_delivery")
    }

    getFirstNameInDeliveryAddress(){


        return this.addressDelivery.locator(".address_firstname")
    }
    getastNameInDeliveryAddress(){


        return this.addressDelivery.locator(".address_lastname")
    }


}