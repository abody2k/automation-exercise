import { Page } from "@playwright/test";

export class Header {


    constructor(private page: Page) {


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

        await this.page.getByRole('link', { name: ' Signup / Login' }).click();

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
    async DeleteAccount(){

        await this.page.getByRole('link', { name: 'Delete Account' }).click();
    }


    /**
     * Basically logs out and redirects the user to a logging out finished UI
     * It is only visible or possible to click when the user is logged in
     */
    async goLogout(){

        await this.page.getByRole('link', { name: 'Logout' }).click();
    }


}