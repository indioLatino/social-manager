import { Component, OnInit } from '@angular/core';
import { Instruction } from '../model/instruction';
import { FoodieRestService } from '../foodie-rest.service';
import { Item } from '../model/item';
import { BehaviorSubject,Observable} from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  private _instructionsArray: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>();
  public instructionsArrayObs: Observable<Instruction[]> = this._instructionsArray.asObservable();
  set instructionsArray(value) {
        // set the latest value for _data BehaviorSubject
        this._instructionsArray.next(value);
    };
  get instructionsArray() {
      // get the latest value from _data BehaviorSubject
      return this._instructionsArray.getValue();
  }
  // instructionsArray: Instruction[];
  // instructionsArray2: Instruction[];
  @Input()
  productId:string;
  item:Item;

  constructor(public rest:FoodieRestService) {
    this.getItemDetail(this.productId);
    // this.instructionsArray.push({
    //     "instructionOrder" : 1,
    //     "instructionText" : "Primero vamos a batir el huevo y mezclarlo con la leche y la harina"
    // });
    // this.instructionsArray.push({
    //      "instructionOrder" : 2,
    //      "instructionText" : "después añadimos la levadura"
    //  });
    //  this.instructionsArray.push({
    //       "instructionOrder" : 4,
    //       "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
    //   });
    // this.instructionsArray.push({
    //      "instructionOrder" : 3,
    //      "instructionText" : "Finalmente lo cocinamos en la sartén con fuego alto"
    //  });
    //  this.instructionsArray.push({
    //       "instructionOrder" : 5,
    //       "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
    //   });
    //   this.instructionsArray.push({
    //        "instructionOrder" : 6,
    //        "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
    //    });
    //    this.instructionsArray.push({
    //         "instructionOrder" : 7,
    //         "instructionText" : "Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga, Una instrucción extra, muy muy muy larga"
    //     });
    // console.log("this.instructionsArray: ");
    // console.log(this.instructionsArray);
  }

  ngOnInit() {

  }


  getItemDetail(id) {
    this.rest.getItemDetail(id).subscribe(item => {
    console.log("getItemDetail executed");
    this.item =  item as Item;
    this._instructionsArray.next(item.instructions as Instruction[]);
    // console.log(this.instructionsArray);
    //this.products = data;
    });
  //console.log(this.items);
  }

}
