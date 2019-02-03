import { Component, OnInit } from '@angular/core';
import { FoodieRestService } from '../foodie-rest.service';
import { Item } from '../model/item';
import { Product } from '../model/product';
import { Instruction } from '../model/instruction';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  items:Item[];
  columnsNumber:number=3;
  columns=[];
  constructor(public rest:FoodieRestService) {
    this.getItems();

  }

  ngOnInit() {

  }
  chunkItemsArray(){

    var i,j,temparray,chunk = this.columnsNumber;

    for (i=0,j=this.items.length; i<j; i+=chunk) {
      console.log("Se ejecuta el chunk");
        temparray = this.items.slice(i,i+chunk);
        this.columns.push(temparray);
        // do whatever
    }
    console.log("Valor de columns:");
    console.log(this.columns);
  }
  getItems() {
    this.rest.getItems().subscribe(itemss => {
    console.log("Se ejecuta correctamente");
    this.items =  itemss.items as Item[];
    console.log(this.items);
    this.chunkItemsArray();
    //this.products = data;
  }
console.log(this.items);
}


}
