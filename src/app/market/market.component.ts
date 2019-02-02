import { Component, OnInit } from '@angular/core';
import { FoodieRestService } from '../foodie-rest.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  items:any = []; 
  constructor(public rest:FoodieRestService) { }

  ngOnInit() {
  }

  getItems() {
  this.items = [];
  this.rest.getItems().subscribe((data: {}) => {
    console.log("Se ejecuta correctamente");
    console.log(data);
    //this.products = data;
  });
}

}
