import {Product} from './product';
import {Instruction} from './instruction';
import {Creator} from './creator';

export class Item {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemMainImage: string;
  creator: Creator;
  productList: Product[];
  instructions: Instruction[];
}
