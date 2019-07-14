import {Injectable} from '@angular/core';
import {Item} from "../../model/item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public item: Item = new Item();

  constructor() {
  }

  public setItem(item:Item):void{
    this.item = item;
  }

}
