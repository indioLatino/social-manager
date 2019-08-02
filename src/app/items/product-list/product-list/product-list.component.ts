import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Product} from "../../../model/product";
import {Item} from "../../../model/item";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  private productsArray: Product[];
  private item: Item = new Item();
  private itemService: ItemService;

  headElements = ['Ingrediente', 'Cantidad', 'Unidad'];

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.item = this.itemService.item;
    this.extractProductsList();
  }

  private extractProductsList(): void {
    this.productsArray = this.item.productList;
    console.log("productList: " + this.productsArray);
  }

}
