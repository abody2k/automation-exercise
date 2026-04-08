import { expect } from "../fixtures/global.fixture";
import { Checkout } from "../pages/checkout.page";
import { Products } from "../pages/products.page";

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