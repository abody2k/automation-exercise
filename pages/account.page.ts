import { Locator, Page } from "@playwright/test";

export class Account {


    loginEmail: Locator
    loginPassword: Locator
    loginWarningMsg: Locator

    signupUsername: Locator
    signupEmail: Locator
    signupDuplicatedEmailMsg: Locator
    loggedInLabel: Locator
    accountDeletedMsg: Locator


    constructor(private page: Page) {

        this.loginEmail = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address')
        this.loginPassword = page.locator('form').getByPlaceholder("Password")
        this.loginWarningMsg = page.getByText('Your email or password is incorrect!')
        this.signupEmail = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address')
        this.signupUsername = page.getByRole('textbox', { name: 'Name' })
        this.signupDuplicatedEmailMsg = page.getByText('Email Address already exist!')
        this.loggedInLabel = page.getByText("Logged in as")
        this.accountDeletedMsg = page.getByText('Account Deleted!')

    }

    /**
     * it takes the user to the login/sign up ui
     */
    async gotoLoginSignup() {

        await this.page.goto("/login")
    }

    async enterEmailForLogin(email: string) {
        await this.loginEmail.click();
        await this.loginEmail.fill(email);
    }

    async enterPasswordForLogin(password: string) {
        await this.loginPassword.click();
        await this.loginPassword.fill(password);
    }

    /**
     * it assumes that you already filled the fields for username and password
     */
    async login() {

        await this.page.getByRole('button', { name: 'Login' }).click()
    }


    async enterSignupEmail(email: string) {


        await this.signupEmail.click();
        await this.signupEmail.fill(email);
    }


    async enterSignupUsername(username: string) {


        await this.signupUsername.click();
        await this.signupUsername.fill(username);
    }


    async clickOnSignup() {

        await this.page.getByRole('button', { name: 'Signup' }).click();

    }


    /**
     * part of signup form, used to check the optional Mr radio
     */
    async checkMr() {
        await this.page.getByRole('radio', { name: 'Mr.' }).check();


    }


    async checkMrs() {
        await this.page.getByRole('radio', { name: 'Mrs.' }).check();
    }


    /**
     * selecting a date for the date of birth
     * @param day a number of type string
     */
    async pickDay(day: string) {
        await this.page.locator('#days').selectOption(day);

    }
    /**
 * selecting a month for the birth date
 * @param month a number of type string
 */
    async pickMonth(month: string) {
        await this.page.locator('#months').selectOption('6');
    }


    /**
 * picking year for the birth date
 * @param year a number of type string
 */
    async pickyear(year: string) {

        await this.page.locator('#years').selectOption(year);
    }


    async checkSignupForANewsLetter() {

        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();

    }
    async uncheckSignupForANewsLetter() {

        await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).uncheck();

    }

    async enterFirstName(firstName: string) {

        await this.page.getByRole('textbox', { name: 'First name *' }).click();
        await this.page.getByRole('textbox', { name: 'First name *' }).fill(firstName);

    }

    async enterLastName(lastName: string) {

        await this.page.getByRole('textbox', { name: 'Last name *' }).click();
        await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);

    }


    async enterSignupPassword(password: string) {

        await this.page.getByRole('textbox', { name: 'Password *' }).click();
        await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);

    }
    async enterAddress(address: string) {

        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
        await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address);

    }



    async enterCity(city: string) {

        await this.page.getByRole('textbox', { name: 'City *' }).click();
        await this.page.getByRole('textbox', { name: 'City *' }).fill(city);

    }

    async enterZipCode(zipcode: string) {

        await this.page.locator('#zipcode').click();
        await this.page.locator('#zipcode').fill(zipcode);

    }


    async enterState(state: string) {

        await this.page.getByRole('textbox', { name: 'State *' }).click();
        await this.page.getByRole('textbox', { name: 'State *' }).fill(state);

    }

    /**
     * 
     * @param MobileNumber the number has to be a string
     */
    async enterMobileNumber(MobileNumber: string) {

        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).click();
        await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(MobileNumber);

    }

    /**
     * 
     * @param country it has to be one of the countries [Australia,India,United States, Canada, New Zealand, Singapore]
     */
    async selectCountry(country: string) {
        await this.page.getByLabel('Country *').selectOption(country);
    }


    async createAccount() {


        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }


    async clickOnContinueAfterMakingAccount() {

        this.page.getByText("Continue").first().click();
    }


    async clickOnContinueAfterDeletingTheAccount() {

        await this.page.getByText('Continue').first().click();
    }


}

