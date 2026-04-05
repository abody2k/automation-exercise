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

        let selector = this.page.getByRole('textbox', { name: "Email", exact:true })
        await selector.click();
        await selector.fill(email)

        //we did not use fill function with Email because there are 2 results and
        //we have to use the exact param to get what we want
    }

    async fillSubject(subject: string) {

        await this.clickOnAndFillField('Subject', subject)
    }

    async fillMsg(msg: string) {

        await this.clickOnAndFillField('Your Message Here', msg)
    }

    /**
     * 
     * @param filePath file path has to be relative to the file executing the code
     */
    async uploadFile(filePath: string) {

        let selector = this.page.getByRole('button', { name: 'Choose File' })
        await selector.click()
        await selector.setInputFiles(path.resolve(__dirname, filePath))
    }


    async submit() {
        await this.page.getByRole('button', { name: 'Submit' }).click()
    }

    async goHome() {
        await this.page.getByRole('link', { name: ' Home' }).click();
    }
}