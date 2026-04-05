import { Locator, Page } from "@playwright/test";
import { Header } from "../components/header.component";

export class ContactUs{



    getInTouch : Locator
    
    constructor(private page : Page){

        this.getInTouch = this.page.getByText("Get In Touch")
    }

    async goto(){

        await this.page.goto(process.env.BASE_URL);

    }

    async fillName(name : string){

        this.page.getByRole('textbox', { name: 'Name' }).fill(name)
    }

    async fillEmail(email : string){

        this.page.getByRole('textbox', { name: 'Email', exact: true })
    }








    
}