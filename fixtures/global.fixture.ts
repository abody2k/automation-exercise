import {test as base} from "@playwright/test"
import { Account } from "../pages/account.page"
import { Header } from "../components/header.component"
import { ContactUs } from "../pages/contactUs.pages"


type GlobalFixture = {

account : Account,
header : Header,
contactUs:ContactUs

}


export const test = base.extend<GlobalFixture>({

    account : async ({page},use)=>{

        await use(new Account(page));

    },

    header : async ({page},use)=>{

        await use(new Header(page))
    },

    
    contactUs: async({page},use)=>{

        await use(new ContactUs(page));

    }
})

export const expect = base.expect;