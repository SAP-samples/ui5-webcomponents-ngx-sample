import { PaymentDetails } from "src/app/interfaces/payment-details";

export const PAYMENT_DETAILS: PaymentDetails = {
    date: new Date(2023, 0o3, 0o1, 10, 56),
    company: 'SAP Airlines',
    paymentMethod: "MasterCard",
    cardNumber: ["****", "****", "****", "1234"],
    cvv: 604,
    expiry: new Date(2034, 11),
}