import { Product } from './product.entity';

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

export class Purchase {
  id: string;
  status: PurchaseStatus;
  createdAt?: Date;
  product: Product;
  productId: string;
}
