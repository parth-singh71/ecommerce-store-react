import { Product } from "./product";

export interface ProductWishlist {
  id: number;
  added_at: string;
  user: number;
  product: number;
}

export interface ExtendedProductWishlist {
  id: number;
  added_at: string;
  user: number;
  product: Product;
}
