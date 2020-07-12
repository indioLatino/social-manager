import {BasketItem} from "./basket-item";

/**
 * Represents a shopping basket associated to a specific item and retail
 */
export class ShoppingBasket {
  productList: BasketItem[];  // List of products in the basket
  retailId: string;     // Retail identifier
  itemId: string;
}
