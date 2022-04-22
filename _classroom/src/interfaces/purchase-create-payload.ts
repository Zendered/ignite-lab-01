export interface ICustomer {
  authUserId: string;
}

export interface IProduct {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatePayload {
  customer: ICustomer;
  product: IProduct;
}
