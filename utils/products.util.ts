import { expect } from "../fixtures/global.fixture";
import { Products } from "../pages/products.page";

export async function addProductAndWaitForAffirmationUI(products: Products, productIndex: number) {

    await products.addProductToCart(productIndex);
    await expect(products.continueShopping).toBeVisible();


}

export async function addProductByNameAndWaitForAffirmationUI(products: Products, productName: string) {

    await products.addProductToCartByName(productName);
    await expect(products.continueShopping).toBeVisible();


}