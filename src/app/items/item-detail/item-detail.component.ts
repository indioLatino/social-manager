import {Component, OnInit, Input, ViewChild, AfterViewInit, AfterViewChecked} from '@angular/core';
import {Instruction} from '../../model/instruction';
import {Item} from '../../model/item';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ItemService} from "../services/item.service";
import {InstructionListComponent} from "../instruction-list/instruction-list.component";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit, AfterViewInit {
  private item: Item = new Item();
  private instructionsReady: Boolean = false;
  private id: string;

  constructor(private rest: FoodieRestService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.getItemDetail(this.id);
  }

  getItemDetail(id) {
    console.log("id: " + id);
    this.rest.getItemDetail(id).subscribe(itemm => {
      this.itemService.setItem(itemm as Item);
      console.log("getItemDetail executed");
      this.item = itemm as Item;
      this.instructionsReady = true;
    });
  }

}
