import { request } from "@playwright/test";



// export async function registerAccount(username: string, email: string, password: string, city: string, state: string, firstName: string, lastName: string, zipcode: string, address1: string, mobileNumber: string, birth_date: string, birth_month: string, birth_year: string, country: string, title: string = "", company: string = "", address2: string = "") {


//     let context = await request.newContext({
//         baseURL: process.env.BASE_URL, extraHTTPHeaders: {


//             // 'Content-Type': "application/json"
//         }
//     });

//     let data = await context.post("api/createAccount", {
//         form: {

//             "name": username,
//             "password": password,
//             "email": email,
//             "city": city,
//             "state": state,
//             "firstname": firstName,
//             "lastname": lastName,
//             "address1": address1,
//             "country": country,
//             "zipcode": zipcode,
//             "birth_date": birth_date,
//             "birth_month": birth_month,
//             "birth_year": birth_year,
//             "mobile_number": mobileNumber,
//             "title": title,
//             "company": company,
//             "address2": address2
//         }
//     });
//    ;
//     /* we are returning a number because the response itself will always be 200
//      * and the actualy responsecode will be in the json data which will affect
//      * the tests 
//     */
//     return  (await data.json()).responseCode;


// }



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


async function newRequest(){

return await request.newContext({baseURL: process.env.BASE_URL, extraHTTPHeaders: {}});

}
