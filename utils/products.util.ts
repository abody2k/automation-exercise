import { expect } from "../fixtures/global.fixture";
import { Products } from "../pages/products.page";

export async function addProductAndWaitForAffirmationUI(products:Products,productIndex:number){

    await products.addProductToCart(productIndex);
    await expect(products.continueShopping).toBeVisible();


}