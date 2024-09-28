interface PaymentMethods {
  pix: {
    method: string;
    txId: string;
    value: number;
    status: string;
    fee: number;
    brCode: string;
    transactionID: string;
    identifier: string;
    qrCodeImage: string;
  };
}

export interface Charge {
  value: number;
  comment: string;
  identifier: string;
  correlationID: string;
  transactionID: string;
  status: string;
  additionalInfo: any[];
  fee: number;
  discount: number;
  valueWithDiscount: number;
  expiresDate: string;
  type: string;
  paymentLinkID: string;
  createdAt: string;
  updatedAt: string;
  brCode: string;
  expiresIn: number;
  pixKey: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  globalID: string;
  paymentMethods: PaymentMethods;
}

// export interface PaymentResponse {
//   charge: Charge;
//   correlationID: string;
//   brCode: string;
// }

interface Plan {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface PaymentResponse {
  value: number;
  payment_status: string;
  mac_address: string;
  correlation_id: number;
  plan: Plan;
  qr_code: string | null;
  payment_approved_at: Date | null;
  id: number;
  created_at: string;
  updated_at: string;
  comment?: string;
  transaction_id?: string;
  pix_key?: string;
  payment_link_url?: string;
  expires_date: Date;
}
