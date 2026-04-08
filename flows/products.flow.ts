import { Products } from "../pages/products.page";

export async function addProductAndProceedToCheckout({productName,products}:{productName: string,products:Products}) {


    await products.addProductToCartByName(productName)
    await products.viewCartAfterAddingItem();
    await products.clickOnProceedToCheckout();
}

