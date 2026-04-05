import { test as base } from "@playwright/test"
import { Account } from "../pages/account.page"
import { Header } from "../components/header.component"
import { ContactUs } from "../pages/contact-us.pages"
import { Products } from "../pages/products.page"


type GlobalFixture = {

    account: Account,
    header: Header,
    contactUs: ContactUs,
    prodcuts: Products

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
    prodcuts: async ({ page }, use) => {

        await use(new Products(page));

    }
})

export const expect = base.expect;