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