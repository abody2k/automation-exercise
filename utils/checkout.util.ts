import { Page } from "@playwright/test"
import {Checkout} from "../pages/checkout.page"
import path from "path"
export async function DownloadInvoice({checkout,page}:{checkout:Checkout,page:Page}){

    const promise = page.waitForEvent("download")
    await checkout.clickOnDownloadInvoice()
    const download = await promise
    await download.saveAs(path.resolve(__dirname,"../downloads"+download.suggestedFilename()))
}