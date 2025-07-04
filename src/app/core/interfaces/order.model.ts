export interface OrderItem {
  uid: string;
  productName: string;
  quantity: number;
  unitPriceWithVat: number;
  totalValueWithVat: number;
}

export interface OrderPayment {
  uid: string;
  paymentName: string;
  isPaid: boolean;
}

export interface OrderSummary {
  uid: string;
  shortCode: string;
  clientName: string;
  deliveryAddressCity?: string | null;
  deliveryDate: string;
  status: number;
  statusName: string;
  shippingMethod: number;
  shippingMethodName: string;
  items: OrderItem[];
  payments: OrderPayment[];
  totalValueWithVat: number;
  finalValue: number;
}