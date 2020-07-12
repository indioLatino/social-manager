import {Item} from "../item";
import {ShoppingLists} from "../shopping-lists";
import {ShoppingBasket} from "../shopping-basket";

export class ItemDetailResponse {
  item: Item;
  shoppingLists: ShoppingBasket[];
}
