import { Component, OnInit, Input } from '@angular/core';
import { Instruction } from '../model/instruction';
import { FoodieRestService } from '../foodie-rest.service';
import { Item } from '../model/item';
import { BehaviorSubject,Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  private _instructionsArray: BehaviorSubject<Instruction[]> = new BehaviorSubject<Instruction[]>();
  private _item: BehaviorSubject<Instruction> = new BehaviorSubject<Instruction>();
  public instructionsArrayObs: Observable<Instruction[]> = this._instructionsArray.asObservable();
  public itemObs: Observable<Instruction> = this._item.asObservable();
  set instructionsArray(value) {
        // set the latest value for _data BehaviorSubject
        this._instructionsArray.next(value);
    };
  get instructionsArray() {
      // get the latest value from _data BehaviorSubject
      return this._instructionsArray.getValue();
  }
  set item(value) {
        // set the latest value for _data BehaviorSubject
        this._item.next(value);
    };
  get item() {
      // get the latest value from _data BehaviorSubject
      return this._item.getValue();
  }
  id:string;
  item:Item;

  constructor(private rest:FoodieRestService,
              private route: ActivatedRoute,
              private location: Location) {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log("id: "+this.route.snapshot.paramMap.get('id'));
    this.getItemDetail(this.id);
  }

  ngOnInit() {

  }


  getItemDetail(id) {
    console.log("id: "+id);
    this.rest.getItemDetail(id).subscribe(item => {
    console.log("getItemDetail executed");
    this._item.next(item as Item);
    this.item =  item as Item;
    this._instructionsArray.next(item.instructions as Instruction[]);
    console.log(this.item);
    //this.products = data;
    });
  //console.log(this.items);
  }

}
