import { Product } from "./product";

export interface ProductCart {
  id: number;
  quantity: number;
  added_at: string;
  user: number;
  product: number;
}

export interface ExtendedProductCart {
  id: number;
  quantity: number;
  added_at: string;
  user: number;
  product: Product;
}
