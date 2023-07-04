export interface PaymentDetails {
  date: Date;
  company: string;
  paymentMethod: "MasterCard" | "VISA" | "AmericanExpress";
  cardNumber: string[];
  cvv: number;
  expiry: Date;
}
