import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {Item} from '../../model/item';
import {Product} from '../../model/product';
import {Instruction} from '../../model/instruction';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../common/service/user.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
/**
 * Component used to render the list of recipes.
 * There are 3 ways of using it:
 *
 * 1) Retrieve all the recipes available. To do this you must use the component without passing any parameter.
 *
 * 2) Retrieve all the recipes by authenticated user: To do this you must
 * pass a route parameter called loggedAuthorId ie: [routerLink]="['item', loggedAuthorIdValue]".
 * This action will filter the recipes by the user and display the edit button on each one
 * of them as long as there is an active session.
 *
 * 3) Retrieve all the recipes for any user: To do this you must pass the authorId parameter through an input binding ie:
 * By placing in the template the following line <app-items-list [authorId]="authorIdValue"></app-items-list>.
 * This action will filter the recipes by the user only in read mode.
 */
export class ItemsListComponent implements OnInit {
  private items: Item[];
  private columnsNumber = 3;
  private columns = [];
  /**
   * Used to receive a presumptive loggedAuthorId.
   * It will be validated if that value really coincides with the actual value of the logged in user id
   * saved in the session.
   */
  private loggedAuthorId;
  /**
   * Logged in user retrieved from the session. It will be used to validate if a received loggedAuthorId
   * parameter is valid.
   */
  private loggedInUser;
  /**
   * This flag will alert on validity of the received loggedAuthorId parameter.
   */
  private isValidLoggedAuthorId: Boolean = false;
  @Input()
  private authorId = 'default';

  constructor(
    private foodieRestService: FoodieRestService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    // this code MUST be placed here, because if it is placed on the ngOnInit method sometimes
    // the method ngOnChanges is executed first, and ngOnInit overrides wanted changes
    // such as when an authorId is received through an @Input parameter
    this.loggedAuthorId = this.route.snapshot.paramMap.get('loggedAuthorId');
    this.userService.userData.subscribe((user) => {
      this.isValidLoggedAuthorId = this.loggedAuthorId === user._id;
    });
    this.getItems();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    // an authorId @Input parameter has been passed
    if (this.authorId !== 'default') {
      this.loggedAuthorId = this.authorId;
      this.getItems();
    }
  }

  // Group elements to render in the market
  chunkItemsArray() {
    let i, j, temporaryArray;
    const chunk = this.columnsNumber;
    for (i = 0, j = this.items.length; i < j; i += chunk) {
      temporaryArray = this.items.slice(i, i + chunk);
      this.columns.push(temporaryArray);
    }
  }

  getItems() {
    this.foodieRestService.getItems(this.loggedAuthorId ? this.loggedAuthorId : '').subscribe(getItemsResponse => {
      this.columns = [];
      this.items = getItemsResponse.items as Item[];
      console.log(this.items);
      this.chunkItemsArray();
    });
  }
}
