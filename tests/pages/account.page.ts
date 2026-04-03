import { Locator, Page } from "@playwright/test";

export class Account {


    loginEmail: Locator
    loginPassword : Locator


    constructor(private page: Page) {

        this.loginEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginPassword = page.locator('form').getByPlaceholder("Password")
    }

    async enterEmailForLogin(email : string){

        await this.loginEmail.fill(email);
    }

    async enterPasswordForLogin(password : string){

        await this.loginPassword.fill(password);
    }
    
    /**
     * it assumes that you already filled the fields for username and password
     */
    async login(){
        
        await this.page.getByRole('button', { name: 'Login' }).click()
    }



}