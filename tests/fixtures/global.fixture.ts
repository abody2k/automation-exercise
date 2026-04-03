import {test as base,expect} from "@playwright/test"
import { Account } from "../pages/account.page"




type GlobalFixture = {

account : Account

}


export const test = base.extend<GlobalFixture>({

    account : async ({page},use)=>{

        await use(new Account(page));

    }
})