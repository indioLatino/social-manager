import {Injectable} from '@angular/core';
import {Item} from "../../model/item";
import {Subject} from "rxjs";
import {ItemDetailResponse} from "../../model/responses/item-detail-response";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  public itemDetailResponse: ItemDetailResponse = new ItemDetailResponse();

  constructor() {
  }

  public setItemDetailResponse(itemDetailResponse: ItemDetailResponse): void {
    this.itemDetailResponse = itemDetailResponse;
  }


}
