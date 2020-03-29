import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { s3 } from 'fine-uploader/lib/core/s3';
import {FormBuilder, FormArray, FormGroup, Validators} from "@angular/forms";
import {TabDirective, TabsetComponent} from "ngx-bootstrap";
import {FoodieRestService} from "../../common/service/foodie-rest.service";
import { ValidateInList } from '../../validators/in-list.validator';


@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {

  //List of available products //todo: load this from the db
  private grocery = [
    {
      "code":"001",
      "translations":{
        "en-GB":"Milk",
        "es-ES":"Leche",
        "fr-FR":"Lait"
      }
    },{
      "code":"002",
      "translations":{
        "en-GB":"Eggs",
        "es-ES":"Huevos",
        "fr-FR":"Oeufs"
      }
    },{
      "code":"003",
      "translations":{
        "en-GB":"Olive oil",
        "es-ES":"Aceite de oliva",
        "fr-FR":"Huile d'olive"
      }
    },{
      "code":"004",
      "translations":{
        "en-GB":"Beans",
        "es-ES":"Frijoles",
        "fr-FR":"Haricots"
      }
    },{
      "code":"005",
      "translations":{
        "en-GB":"Avocado",
        "es-ES":"Aguacate",
        "fr-FR":"Avocat"
      }
    },{
      "code":"006",
      "translations":{
        "en-GB":"Bacon",
        "es-ES":"Bacon",
        "fr-FR":"Bacon"
      }
    }
  ];
  //Form object that contains all data captured in this component
  itemForm: FormGroup;
  //Bucket where the images are uploaded todo: use a global env property for this
  bucketName = 'foodieapi';
  private foodieService: FoodieRestService;
  uploader: any;
  //Default image when no image is loaded todo: load this as a environment variable
  formImage: string = "https://foodieapi.s3.amazonaws.com/recipes/f5fcadb4-53fd-4795-ac4d-47f2af45fb97";
  //Tabs related variables
  disableSwitching: boolean;
  @ViewChild('tabset', {read: ElementRef, static: true}) tabsetEl: ElementRef;
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  @ViewChild('first', {static: true}) first: TabDirective;
  @ViewChild('second', {static: true}) second: TabDirective;

  constructor(private fb: FormBuilder, private service:FoodieRestService) {
    this.itemForm = this.fb.group({
      itemTitle: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemImage: ['', Validators.required],
      products: this.fb.array([
        //todo: important get the array of translations
      //  this.fb.control('', [ValidateInList([])])
      ])
    });
    this.foodieService = service;
    this.foodieService.getProducts().subscribe((response) => {
      this.grocery = response.response;
      console.log("Los nombres son: " + response);
    });
  }

  ngOnInit() {
    /*this.itemForm = new FormGroup({
      itemTitle: new FormControl(""),
      itemDescription: new FormControl(""),
      itemImage: new FormControl("")
    });*/
  }

  ngAfterViewInit() {
    let instance = this;
    this.uploader = new s3.FineUploaderBasic({
      button: document.getElementById('upload_image'),
      debug: false,
      autoUpload: true,
      multiple: true,
      validation: {
        allowedExtensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
        sizeLimit: 5120000 // 50 kB = 50 * 1024 bytes
      },
      request: {
        endpoint: 'https://' + instance.bucketName  +'.s3.amazonaws.com/',
        accessKey: 'AKIA4UZ6KTWAYO3ICQM5',
        params: { 'Cache-Control': 'private, max-age=31536000, must-revalidate' }
      },
      signature: {
        //todo: use a global env property for this
        endpoint: 'http://localhost:1234/aws/awsSignPostRequest/',
        version: 4,
        params: {
          drift: ((new Date().getTimezoneOffset()*60*2) * 1000) - Date.now()
        }
      },
      //todo: Check what does this property do
      iframeSupport: {
        localBlankPagePath: '/somepage.html'
      },
      cors: {
        expected: true,
        sendCredentials: true
      },
      objectProperties: {
        acl: 'public-read',
        region: 'eu-west-1',
        key: function(fileId) {
          return 'recipes/' + this.getUuid(fileId);
        }
      },
      callbacks: {
        onSubmit: function (id, fileName) {
          console.log('selected file:', fileName);
        },
        // onSubmitted: function(id, name) { alert('onSubmitted');},
        onComplete: function (id, name, responseJSON, maybeXhr) {
          if(responseJSON.success) {
            console.log('upload complete', name);
            let uploadUrl = 'https://' + instance.bucketName + '.s3.amazonaws.com/' + this.getKey(id);
            console.log('uploaded image url', uploadUrl);
            instance.itemForm.controls['itemImage'].setValue(uploadUrl);
            instance.formImage = uploadUrl;
          }
        },
        // onAllComplete: function (successful, failed) { console.log(failed); },
        // onCancel: function (id, name) {},
        // onUpload: function(id, name) { alert('onUpload');},
        // onUploadChunk: function(id, name, chunkData) { alert('onUploadChunk');},
        // onUploadChunkSuccess: function(id, chunkData, responseJSON, xhr) { alert('onUploadChunkSuccess');},
        // onResume: function(id, fileName, chunkData) { alert('onResume');},
        // onProgress: function (id, name, loaded, total) {},
        // onTotalProgress: function(loaded, total) { alert('onTotalProgress');},
        // onError: function (id, name, reason, maybeXhrOrXdr) {  },
        // onSessionRequestComplete: function (response, success, xhrOrXdr) { }
      }
    });
  }

  private get products(){
    return this.itemForm.get("products") as FormArray;
  }

  private addNewProduct():void{
    this.products.push(this.fb.control(""));
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
