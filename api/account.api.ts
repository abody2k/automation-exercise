import { newRequest } from "../utils/apis.util";





export async function registerAccount(obj: { name?: string, email?: string, password?: string, city?: string, state?: string, firstname?: string, lastname?: string, zipcode?: string, address1?: string, mobile_number?: string, birth_date?: string, birth_month?: string, birth_year?: string, country?: string, title?: string, company?: string, address2?: string }) {


    let context = await newRequest();

    let data = await context.post("api/createAccount", {
        form: obj
    });
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());


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


export async function deleteAccount(email:string,password:string) {

    let context = await newRequest();

    let data = await context.delete(`api/deleteAccount`, { form: {
        email:email,
        password:password
    } });
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());
}



export async function verifyLogin(email:string,password:string) {

    let context = await newRequest();

    let data = await context.post(`api/verifyLogin`, { form: {
        email:email,
        password:password
    } });
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());
}


/**
 * the following api methods will be used as edge cases only and are not expected
 * to perform well but rather to test the error handling system
 */


export async function verifyLoginwithDelete() {

    let context = await newRequest();

    let data = await context.delete(`api/verifyLogin`);
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());
}


export async function verifyLoginwithPost(password:string) {

    let context = await newRequest();

    let data = await context.post(`api/verifyLogin`,{form:{password:password}});
    ;
    /* we are returning a number because the response itself will always be 200
     * and the actualy responsecode will be in the json data which will affect
     * the tests 
    */
    return (await data.json());
}