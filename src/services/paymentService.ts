import { apiFetch } from "../config/api";

export interface PaymentData {
  correlationID: number;
  value: number;
  comment: string;
  plan_id: number;
  mac_address: string;
}

export const createPayment = async (paymentData: PaymentData) => {
  return apiFetch({
    path: "/payments/generate",
    method: "POST",
    body: JSON.stringify(paymentData),
  });
};
