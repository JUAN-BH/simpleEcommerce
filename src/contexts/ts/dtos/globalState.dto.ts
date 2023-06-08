import { Product } from "../../../ts/models/product.model";

export type ProductOnDisplay = Pick<
  Product,
  "title" | "price" | "description" | "images"
>;

export interface ProductInCart
  extends Pick<Product, "id" | "title" | "price" | "images"> {
  qty: number;
  oPrice: number;
}
