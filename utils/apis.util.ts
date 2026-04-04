//shared functions by APIs goes here

import { request } from "@playwright/test";


export async function newRequest() {

    return await request.newContext({ baseURL: process.env.BASE_URL, extraHTTPHeaders: {} });

}