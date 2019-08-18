import {Component, OnInit} from '@angular/core';
import {ShoppingBasket} from "../../model/shopping-basket";
import {ItemService} from "../../items/services/item.service";
import {RetailImages} from "../../model/enums/retail-images.enum";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  private shoppingBaskets: ShoppingBasket[] = [];
  private itemService: ItemService;
  private retailImages = RetailImages;
  private totalAmounts: number[] = [];
  private showPricingComponent: boolean = false;

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  ngOnInit() {
    let shoppingBasketsInItem = this.itemService.itemDetailResponse.shoppingLists as ShoppingBasket[];
    this.shoppingBaskets = shoppingBasketsInItem? shoppingBasketsInItem:[];
    this.showPricingComponent = this.shoppingBaskets ? this.shoppingBaskets.length > 0 : false;
    this.calculateTotalAmounts();
    console.log(this.shoppingBaskets)
  }

  private calculateTotalAmounts() {
    this.shoppingBaskets.forEach((shoppingBasket) => {
      let totalAmount = 0;
      shoppingBasket.productList.forEach((product) => {
        totalAmount = totalAmount + product.price;
      });
      this.totalAmounts.push(totalAmount);
    })
  }

  private getRetailImage(retail: string): string {
    return RetailImages[retail];
  }

}
