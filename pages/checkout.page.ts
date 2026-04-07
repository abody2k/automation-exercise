import { Locator, Page } from "@playwright/test";

export class Checkout {

    private currentAdress = 0

    addressDelivery: Locator
    constructor(private page: Page) {

        this.addressDelivery = page.locator("#address_delivery")
    }

    /**
     * it is going to be separated by space as in firstname lastname
     * @returns locator of the corresponding field
     */
    getFirstNameLastName() {


        return this.getLocatorUsingAddressDelivery(".address_firstname")
    }

    getCityStatePostcode() {


        return this.getLocatorUsingAddressDelivery(".address_city")
    }


    getCountry() {


        return this.getLocatorUsingAddressDelivery(".address_country_name")
    }

    getPhoneNumber() {


        return this.getLocatorUsingAddressDelivery(".address_phone")
    }


    getAddress1Address2() {


        return this.getLocatorUsingAddressDelivery(".address_address1").nth(1) // for some reason, the dev decided to duplicate the field 3 times so the right one is the second field hence the nth(1)
    }

    getLocatorUsingAddressDelivery(locator_class: string) {

        return this.addressDelivery.locator(locator_class)
    }

    /**
     * a function that switches between delivery and biling address
     * every time you call it, it switches between the two
     * the inital value points to delivery address.
     * use it when you want to get the locator of the address info in
     * the other container
     */
    changeAddress() {

        this.addressDelivery = this.currentAdress == 0 ? this.page.locator("#address_invoice") : this.page.locator("#address_delivery")
        this.currentAdress += 1;
        this.currentAdress = this.currentAdress % 2;
    }
}