import { Locator, Page } from "@playwright/test";

export class Account {


    loginEmail: Locator
    loginPassword : Locator


    constructor(page: Page) {

        this.loginEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginPassword = page.locator('form').getByPlaceholder("Password")
    }

    async enterEmailForLogin(email : string){

        await this.loginEmail.fill(email);
    }

    



}