import { Locator, Page } from "@playwright/test";

export class Account {


    loginEmail: Locator
    loginPassword : Locator
    loginWarningMsg: Locator


    constructor(private page: Page) {

        this.loginEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginPassword = page.locator('form').getByPlaceholder("Password")
        this.loginWarningMsg = page.getByText('Your email or password is incorrect!')
    }

    /**
     * it takes the user to the login/sign up ui
     */
    async gotoLoginSignup(){

        await this.page.goto("/login")
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