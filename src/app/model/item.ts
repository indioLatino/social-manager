import { Product } from './product';
import { Instruction } from './instruction';
export class Item {
  itemName: string;
  itemDescription: string;
  itemMainImage: string;
  productList: Product[];
  instructions:Instruction[];
}
