import { newRequest } from "../utils/apis.util";

export async function getAllProducts() {

    let context = await newRequest();

    let data = await context.get(`api/productsList`);
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());

}

export async function getAllbrands() {

    let context = await newRequest();

    let data = await context.get(`api/brandsList`);

    return (await data.json());

}



export async function searchForProduct(product : {search_product?:string}) {

    let context = await newRequest();

    let data = await context.post(`api/searchProduct`,{form:product});

    return (await data.json());

}

/**
 * here goes api functions that are there only for test puoposes and are not expected
 * to give an actual result, meaning this is an negative case
 */


export async function getAllProductsWithPost() {

    let context = await newRequest();

    let data = await context.post(`api/productsList`);
    return (await data.json());

}



export async function getAllbrandsWithPut() {

    let context = await newRequest();

    let data = await context.post(`api/brandsList`);

    return (await data.json());

}