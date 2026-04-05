import { contactUsData } from "../data/contactUs.data";
import { expect, test } from "../fixtures/global.fixture";

test.describe("All contact us page related tests goes here",()=>{



    test("Testing if contact us work normally",async ({contactUs,page,header})=>{


        await contactUs.goto() // this goes to home first
        await header.goToContactUs();
        await contactUs.fillName(contactUsData.name)
        await contactUs.fillEmail(contactUsData.email)
        await contactUs.fillSubject(contactUsData.subject)
        await contactUs.fillMsg(contactUsData.msg)
        await contactUs.uploadFile(contactUsData.filePath)
        page.on('dialog', dialog => dialog.accept());
        await contactUs.submit();
        
        
        
        await expect(contactUs.successMsg).toBeVisible({timeout:30000});
        await contactUs.goHome();
        await expect(page).toHaveURL(process.env.BASE_URL);

    })
})