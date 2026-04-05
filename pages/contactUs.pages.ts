import { Page } from "@playwright/test";
import { Header } from "../components/header.component";

export class ContactUs{

    constructor(private page : Page){


    }

    async goto(header:Header){

        await this.page.goto(process.env.BASE_URL);
        await header.goToContactUs();

    }




    
}