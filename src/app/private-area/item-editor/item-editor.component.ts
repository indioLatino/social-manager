import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators, FormControl} from '@angular/forms';
import {TabDirective, TabsetComponent} from 'ngx-bootstrap/tabs';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {Item} from '../../model/item';
import {Creator} from '../../model/creator';
import {UserService} from '../../common/service/user.service';
import {FoodieUser} from '../../model/foodie-user';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/product';
import {Instruction} from '../../model/instruction';
import {UploadService} from '../../common/service/upload.service';


@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {

  // todo: make it a property
  private bucketName = 'foodieapi';
  // todo: make it a property
  private formImage = 'https://foodieapi.s3.amazonaws.com/recipes/f5fcadb4-53fd-4795-ac4d-47f2af45fb97';
  // todo: make it a property
  private emptyImageUrl = 'https://foodieapi.s3.amazonaws.com/recipes/3bb0be58-64c3-43db-9866-b331e86fb690';
  // List of available products
  private grocery = [];
  // Form object that contains all data captured in this component
  private itemForm: FormGroup;
  private uploader: any;
  private loggedUser: FoodieUser;
  private disableSwitching: boolean;
  private item: Item;
  private itemId;
  private measurementUnits;
  private editionMode = false;

  // Tabs related variables
  @ViewChild('tabset', {read: ElementRef, static: true}) tabsetEl: ElementRef;
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  @ViewChild('first', {static: true}) first: TabDirective;
  @ViewChild('second', {static: true}) second: TabDirective;

  constructor(
    private formBuilder: FormBuilder,
    private foodieService: FoodieRestService,
    private userService: UserService,
    private uploadService: UploadService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.editionMode = this.itemId ? true : false;
    this.measurementUnits = this.foodieService.getMeasurements();
    // build the form
    this.buildFormItems();
    // If an id is passed -> bring the item info
    if (this.itemId) {
      this.foodieService.getItemDetail(this.itemId).subscribe((itemDetailResponse) => {
        this.item = itemDetailResponse.item;
        this.initializeFormItems();
      });
    }
    // Load the user information, it will be used to set the creator
    this.userService.userData.subscribe((user: FoodieUser) => {
      this.loggedUser = user;
    });
    // Populate the products available
    this.foodieService.getProducts().subscribe((response) => {
      this.grocery = response.response;
      console.log('Los nombres son: ' + response);
    });
    // show default empty fields if it is not an update operation
    if (!this.itemId) {
      this.addNewInstruction(null);
      this.addNewProduct(null);
    }
  }

  ngAfterViewInit() {
    this.uploader = this.uploadService.getUploader(this, 'itemMainImage', this.itemForm);
  }

  private get productList() {
    return this.itemForm.get('productList') as FormArray;
  }

  private get instructions() {
    return this.itemForm.get('instructions') as FormArray;
  }


  private initializeFormItems(): void {
    this.itemForm.get('itemName').setValue(this.item.itemName);
    this.itemForm.get('itemDescription').setValue(this.item.itemDescription);
    this.itemForm.get('itemMainImage').setValue(this.item.itemMainImage);
    this.item.productList.forEach((product) =>
      this.addNewProduct(product)
    );
    this.item.instructions.forEach((instruction) =>
      this.addNewInstruction(instruction)
    );
    this.formImage = this.item.itemMainImage;
  }


  private addNewInstruction(instruccion: Instruction): void {
    const instruction = new FormGroup({
      instructionOrder: new FormControl({value: instruccion ? instruccion.instructionOrder : this.instructions.length + 1, disabled: true}),
      instructionText: new FormControl(instruccion ? instruccion.instructionText : '')
    });
    this.instructions.push(instruction);
  }

  private addNewProduct(producto: Product): void {
    const product = new FormGroup({
      productName: new FormControl(producto ? producto.productName : ''),
      productMeasurement: new FormControl(producto ? producto.productMeasurement : ''),
      productUnit: new FormControl(producto ? producto.productUnit : '')
    });
    this.productList.push(product);
  }

  private buildFormItems(): void {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemMainImage: ['', Validators.required],
      // todo: important get the array of translations
      //  this.fb.control('', [ValidateInList([])])
      productList: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])

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
        setTimeout(() => {
          this.tabset.tabs[tabIndex].active = true;
        });
      }
    }
  }

  private buildItemFromForm(): Item {
    const creator = new Creator();
    creator.image = this.loggedUser.userProfilePicture ? this.loggedUser.userProfilePicture : this.emptyImageUrl;
    creator.name = this.loggedUser.userName + ' ' + this.loggedUser.userLastName;
    creator.userId = this.loggedUser._id;
    const item = this.itemForm.getRawValue() as Item;
    item.creator = creator;
    return item;
  }

  onUpdate() {
    const item = this.buildItemFromForm();
    this.foodieService.updateItem(this.itemId, item).subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    });
  }

  onSubmit() {
    const item = this.buildItemFromForm();
    this.foodieService.addItem(item).subscribe((response) => {
      console.log(response);
      this.router.navigate(['']);
    });
  }
}

