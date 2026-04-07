import { Locator, Page } from "@playwright/test";

export class Checkout {

    addressDelivery: Locator
    constructor(private page: Page) {

        this.addressDelivery = page.locator("#address_delivery")
    }

    /**
     * it is going to be separated by space as in firstname lastname
     * @returns locator of the corresponding field
     */
    getFirstNameLastNameInDeliveryAddress() {


        return this.getLocatorUsingAddressDelivery(".address_firstname")
    }

    getCityStatePostcodeInDeliveryAddress() {


        return this.getLocatorUsingAddressDelivery(".address_city")
    }


    getCountryInDeliveryAddress() {


        return this.getLocatorUsingAddressDelivery(".address_country_name")
    }

    getPhoneNumberInDeliveryAddress() {


        return this.getLocatorUsingAddressDelivery(".address_phone")
    }


    getAddress1Address2() {


        return this.getLocatorUsingAddressDelivery(".address_address1").nth(1) // for some reason, the dev decided to duplicate the field 3 times so the right one is the second field hence the nth(1)
    }

    getLocatorUsingAddressDelivery(locator_class: string) {

        return this.addressDelivery.locator(locator_class)
    }
}