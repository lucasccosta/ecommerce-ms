export type CreateOrderRequest = {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
};
