import {test as base} from "@playwright/test"
import { Account } from "../pages/account.page"
import { Header } from "../components/header.component"




type GlobalFixture = {

account : Account,
header : Header

}


export const test = base.extend<GlobalFixture>({

    account : async ({page},use)=>{

        await use(new Account(page));

    },

    header : async ({page},use)=>{

        await use(new Header(page))
    }
})

export const expect = base.expect;