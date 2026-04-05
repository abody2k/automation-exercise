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

    async clickOnAndFillField(name:string,content:string){

        let selector = this.page.getByRole('textbox',{name:name})
        await selector.click();
        await selector.fill(content)
    }
    async fillName(name : string){
        
        await this.clickOnAndFillField('Name',name)
    }

    async fillEmail(email : string){

        await this.clickOnAndFillField('Email',email)
    }

    async fillSubject(subject : string){

        await this.clickOnAndFillField('Subject',subject)
    }






    
}