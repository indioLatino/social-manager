import {Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {Instruction} from '../../model/instruction';
import {Item} from '../../model/item';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ItemService} from "../services/item.service";
import {TabsetComponent, TabDirective} from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit, AfterViewInit {
  private item: Item = new Item();
  private itemLoaded: Boolean = false;
  private id: string;

  disableSwitching: boolean;
  @ViewChild('tabset', {read: ElementRef, static: true}) tabsetEl: ElementRef;
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  @ViewChild('first', {static: true}) first: TabDirective;
  @ViewChild('second', {static: true}) second: TabDirective;

  constructor(private rest: FoodieRestService,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private location: Location) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getItemDetail(this.id);
  }

  /**
   * Retrieves the item identified with the id
   * @param id: Identifier of the item
   */
  getItemDetail(id) {
    console.log("id: " + id);
    this.rest.getItemDetail(id).subscribe(itemm => {
      this.itemService.setItem(itemm as Item);
      console.log("getItemDetail executed");
      this.item = itemm as Item;
      this.itemLoaded = true;
    });
  }

  confirmTabSwitch($event) {
    if (this.disableSwitching) {
      const confirm = window.confirm('Discard changes and switch tab?');
      if (confirm) {
        this.disableSwitching = false;
        const liArr = Array.from(this.tabsetEl.nativeElement.querySelectorAll('ul li'));
        let tabIndex;
        liArr.forEach((li, i) => {
          if ((li as string).includes($event.target)) {
            tabIndex = i;
          }
        });
        console.log('tab index', tabIndex);
        setTimeout(() => {
          this.tabset.tabs[tabIndex].active = true;
        });
      }
    }
  }

}
