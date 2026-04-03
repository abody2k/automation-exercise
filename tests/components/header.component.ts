import { Locator, Page } from "@playwright/test";

export class Header {

    //all these fields are locators that are in the header
    /* I only added these fields because they will be the only fields
    * that will be used later to assert for visibility in tests
    */
   
    signupLogin: Locator
    logout: Locator
    deleteAccount: Locator


    constructor(private page: Page) {
        this.signupLogin = this.page.getByRole('link', { name: ' Signup / Login' })
        this.logout = this.page.getByRole('link', { name: 'Logout' })
        this.deleteAccount = this.page.getByRole('link', { name: 'Delete Account' })
    }


    /**
     * Takes the user to home page
     */
    async goHome() {


        await this.page.getByRole('link', { name: ' Home' }).click()

    }

    /**
     * Takes the user to products UI
     */
    async goToProducts() {

        await this.page.getByRole('link', { name: ' Products' }).click();

    }

    /**
     * Takes the user to signup and login UI and it is only visible if the user
     * hasn't logged in yet
     */
    async goToSignupLogin() {

        await this.signupLogin.click();

    }

    /**
     * Takes the user to the APIs testing UI/list
     */
    async goToAPITesting() {
        await this.page.getByRole('link', { name: ' API Testing' }).click();
    }

    /**
     * navigate to contact us UI
     */
    async goToContactUs() {
        await this.page.getByRole('link', { name: ' Contact us' }).click();
    }

    /**
     * I didn't use go in naming convension because this function deletes the account
     * and navigate entirely without redirecting the user to a confirmation UI
     * It is only visible or possible to click when the user is logged in
     */
    async DeleteAccount() {

        await this.deleteAccount.click();
    }


    /**
     * Basically logs out and redirects the user to a logging out finished UI
     * It is only visible or possible to click when the user is logged in
     */
    async goLogout() {

        await this.logout.click();
    }

    /**
     * CLicks on the header's logo
     */
    async clickOnLogo() {

        await this.page.getByRole('link', { name: 'Website for automation' }).click();
    }

}