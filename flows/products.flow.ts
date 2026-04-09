import { Page } from "@playwright/test";
import { expect } from "../fixtures/global.fixture";
import { Checkout } from "../pages/checkout.page";
import { Products } from "../pages/products.page";
import { Header } from "../components/header.component";
import { goHome } from "./home.flow";

export async function addProductAndProceedToCheckout({ productName, products }: { productName: string, products: Products }) {


    await products.addProductToCartByName(productName)
    await products.viewCartAfterAddingItem();
    await products.clickOnProceedToCheckout();
}


export async function checkIfAdressInfoIsCorrect({ checkout, data }: { checkout: Checkout, data: { firstName: string, lastName: string, mobileNumber: string, zipCode: string, city: string, country: string, address: string, state: string } }) {

    let addressType: ["biling", "delivery"] = ["biling", "delivery"]
    for (const address of addressType) {

        await expect(checkout.getFirstNameLastName(address)).toContainText(`${data.firstName} ${data.lastName}`)
        await expect(checkout.getPhoneNumber(address)).toContainText(`${data.mobileNumber}`)
        await expect(checkout.getAddress1Address2(address)).toContainText(`${data.address}`)
        await expect(checkout.getCityStatePostcode(address)).toContainText(`${data.city} ${data.state} ${data.zipCode}`)
        await expect(checkout.getCountry(address)).toContainText(`${data.country}`)
    }

}



export async function goToProductsThroughHome({ page, header }: { page: Page, header: Header }) {


    await goHome(page);
    await header.goToProducts();
    await expect(page).toHaveURL(/.*products/)
}


export async function addProductByNameAndWaitForAffirmationUI(products: Products, productName: string) {

    await products.addProductToCartByName(productName);
    await expect(products.continueShopping).toBeVisible();


}


export async function addProductAndWaitForAffirmationUI(products: Products, productIndex: number) {

    await products.addProductToCart(productIndex);
    await expect(products.continueShopping).toBeVisible();


}