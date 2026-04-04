import { request } from "@playwright/test";





export async function registerAccount(obj: { name?: string, email?: string, password?: string, city?: string, state?: string, firstName?: string, lastName?: string, zipcode?: string, address1?: string, mobileNumber?: string, birth_date?: string, birth_month?: string, birth_year?: string, country?: string, title?: string, company?: string, address2?: string }) {


    let context = await newRequest();

    let data = await context.post("api/createAccount", {
        form: obj
    });
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json()).responseCode;


}


async function newRequest() {

    return await request.newContext({ baseURL: process.env.BASE_URL, extraHTTPHeaders: {} });

}

export async function getUserAccountDetailByEmail(email?: string) {

    let context = await newRequest();

    let data = await context.get(`api/getUserDetailByEmail?email=${email}`);
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());

}


/**
 * it uses the email and password to update the account, they have to be part of the params
 * @param params 
 * @returns 
 */
export async function updateUserAccount(params: { name?: string, email?: string, password?: string, city?: string, state?: string, firstName?: string, lastName?: string, zipcode?: string, address1?: string, mobileNumber?: string, birth_date?: string, birth_month?: string, birth_year?: string, country?: string, title?: string, company?: string, address2?: string }) {

    let context = await newRequest();

    let data = await context.put(`api/updateAccount`, { form: params });
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());
}