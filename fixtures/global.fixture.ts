import { test as base } from "@playwright/test"
import { Account } from "../pages/account.page"
import { Header } from "../components/header.component"
import { ContactUs } from "../pages/contact-us.pages"
import { Products } from "../pages/products.page"
import { Home } from "../pages/home.page"
import { Checkout } from "../pages/checkout.page"


type GlobalFixture = {

    account: Account,
    header: Header,
    contactUs: ContactUs,
    products: Products,
    home: Home,
    checkout: Checkout,

}


export const test = base.extend<GlobalFixture>({

    account: async ({ page }, use) => {

        await use(new Account(page));

    },

    header: async ({ page }, use) => {

        await use(new Header(page))
    },


    contactUs: async ({ page }, use) => {

        await use(new ContactUs(page));

    },
    products: async ({ page }, use) => {

        await use(new Products(page));

    },

    home: async ({ page }, use) => {

        await use(new Home(page))
    },

    checkout: async ({ page }, use) => {

        await use(new Checkout(page))
    }
})

export const expect = base.expect;