import { Locator, Page } from "@playwright/test";
import path from "path";

export class ContactUs {



    getInTouch: Locator
    successMsg: Locator

    constructor(private page: Page) {

        this.getInTouch = this.page.getByText("Get In Touch")
        this.successMsg = this.page.locator('#contact-page').getByText('Success! Your details have')
    }

    async goto() {

        await this.page.goto(process.env.BASE_URL);

    }

    async clickOnAndFillField(name: string, content: string) {

        let selector = this.page.getByRole('textbox', { name: name })
        await selector.click();
        await selector.fill(content)
    }
    async fillName(name: string) {

        await this.clickOnAndFillField('Name', name)
    }

    async fillEmail(email: string) {

        await this.clickOnAndFillField('Email', email)
    }

    async fillSubject(subject: string) {

        await this.clickOnAndFillField('Subject', subject)
    }


    async uploadFile(file: File) {

        let selector = this.page.getByRole('button', { name: 'Choose File' })
        await selector.click()
        await selector.setInputFiles(path.resolve(__dirname, "icon.ico"))
    }


    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }

    async goHome() {
        await this.page.getByRole('link', { name: ' Home' }).click();
    }
}