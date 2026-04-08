import { Checkout } from "../pages/checkout.page";

export async function fillPaymentInformation({ checkout, nameOnCard, cardNumber, cvc, year, month }: { checkout: Checkout, nameOnCard: string, cardNumber: string, cvc: string, year: string, month: string }) {

    await checkout.fillNameOnCard(nameOnCard)
    await checkout.fillCardNumber(cardNumber)
    await checkout.fillCvc(cvc)
    await checkout.fillYear(year)
    await checkout.fillMonth(month)

}