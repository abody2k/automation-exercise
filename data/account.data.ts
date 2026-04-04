//this file contains data that is to be used to make new accounts or to log in to them
//the other login.data.json file is actually used to store cookies and tokens and is not to be modified by the user


/**
 * this data structure is to be used when testing with UI
 */
export const data = {

    loginEmail: "goodman@fake-email.com",// these info here are vaild
    loginPassword: ",*F-4#f%~vC-ZCB",// these info here are vaild,
    incorrectLoginEmail: "12@s",
    incorrectLoginPassword: "12@s",
    signupEmail: "somethidnggggg@somewhere.com",
    signupPassword: "hahahaha",
    signupUsername: "someone",

    //the following fields are all related to signup only

    firstName: "dfdg",
    lastName: "dfgdfg",
    address: "fdgfg",
    country: "Australia",
    state: "ddd",
    city: "sdsd",
    zipCode: "234324",
    mobileNumber: "23432234",
    birth_date: "7",
    birth_month: "7",
    birth_year: "2000",


    invalidBirth_date: "99",
    invalidBirth_month: "88",
    invalidBirth_year: "0",
    signupEmailNew: "somethidngggdsdfsgg@somewhere.com", // this one is to be used to check if same email can be used 
    // for multiple accounts and has to be different than the other signup account
    //because that is used in different tests


}

/**
 * this object is to be used by api calls only
 */
export const apiData = {


}