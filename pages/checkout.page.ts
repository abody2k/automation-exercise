import { Page } from "@playwright/test";

export class Checkout{

    constructor(private page: Page){

    }

    getFirstNameInDeliveryAddress(){


        return this.page.locator("#address_delivery").locator(".address_firstname")
    }


}