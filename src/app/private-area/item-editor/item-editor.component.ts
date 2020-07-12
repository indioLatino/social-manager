import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {s3} from 'fine-uploader/lib/core/s3';
import {FormBuilder, FormArray, FormGroup, Validators, FormControl} from '@angular/forms';
import {TabDirective, TabsetComponent} from 'ngx-bootstrap';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {ValidateInList} from '../../validators/in-list.validator';
import {Item} from '../../model/item';
import {Product} from '../../model/product';
import {Creator} from '../../model/creator';


@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {
  private measurementUnits = [
    {
      'code': '001',
      'translations': {
        'en-GB': 'Litre',
        'es-ES': 'Leche',
        'fr-FR': 'Litre'
      }
    },
    {
      'code': '002',
      'translations': {
        'en-GB': 'Kilogram',
        'es-ES': 'Kilogramo',
        'fr-FR': 'Kilogramme'
      }
    },
    {
      'code': '003',
      'translations': {
        'en-GB': 'Pound',
        'es-ES': 'Libra',
        'fr-FR': 'Livre'
      }
    },
    {
      'code': '004',
      'translations': {
        'en-GB': 'Cup',
        'es-ES': 'Taza',
        'fr-FR': 'Coupe'
      }
    },
    {
      'code': '005',
      'translations': {
        'en-GB': 'Ounce',
        'es-ES': 'Onza',
        'fr-FR': 'Once'
      }
    },
    {
      'code': '006',
      'translations': {
        'en-GB': 'Gram',
        'es-ES': 'Gramo',
        'fr-FR': 'Gramme'
      }
    },
    {
      'code': '007',
      'translations': {
        'en-GB': 'Milk',
        'es-ES': 'Cucharilla',
        'fr-FR': 'cuillère à café'
      }
    }
  ];

  // List of available products //todo: load this from the db
  private grocery = [
    {
      'code': '001',
      'translations': {
        'en-GB': 'Milk',
        'es-ES': 'Leche',
        'fr-FR': 'Lait'
      }
    }, {
      'code': '002',
      'translations': {
        'en-GB': 'Eggs',
        'es-ES': 'Huevos',
        'fr-FR': 'Oeufs'
      }
    }, {
      'code': '003',
      'translations': {
        'en-GB': 'Olive oil',
        'es-ES': 'Aceite de oliva',
        'fr-FR': 'Huile d\'olive'
      }
    }, {
      'code': '004',
      'translations': {
        'en-GB': 'Beans',
        'es-ES': 'Frijoles',
        'fr-FR': 'Haricots'
      }
    }, {
      'code': '005',
      'translations': {
        'en-GB': 'Avocado',
        'es-ES': 'Aguacate',
        'fr-FR': 'Avocat'
      }
    }, {
      'code': '006',
      'translations': {
        'en-GB': 'Bacon',
        'es-ES': 'Bacon',
        'fr-FR': 'Bacon'
      }
    }
  ];
  // Form object that contains all data captured in this component
  itemForm: FormGroup;
  // Bucket where the images are uploaded todo: use a global env property for this
  bucketName = 'foodieapi';
  private foodieService: FoodieRestService;
  uploader: any;
  // Default image when no image is loaded todo: load this as a environment variable
  formImage = 'https://foodieapi.s3.amazonaws.com/recipes/f5fcadb4-53fd-4795-ac4d-47f2af45fb97';
  // Tabs related variables
  disableSwitching: boolean;
  @ViewChild('tabset', {read: ElementRef, static: true}) tabsetEl: ElementRef;
  @ViewChild('tabset', {static: true}) tabset: TabsetComponent;
  @ViewChild('first', {static: true}) first: TabDirective;
  @ViewChild('second', {static: true}) second: TabDirective;

  constructor(private fb: FormBuilder, private service: FoodieRestService) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      itemDescription: ['', Validators.required],
      itemMainImage: ['', Validators.required],
      // todo: important get the array of translations
      //  this.fb.control('', [ValidateInList([])])
      productList: this.fb.array([]),
      instructions: this.fb.array([]),
    });
    this.foodieService = service;
    this.foodieService.getProducts().subscribe((response) => {
      this.grocery = response.response;
      console.log('Los nombres son: ' + response);
    });
    // todo: recibir las medidas de la bdd
    // this.measurementUnits = ...
  }

  ngOnInit() {
    /*this.itemForm = new FormGroup({
      itemTitle: new FormControl(""),
      itemDescription: new FormControl(""),
      itemImage: new FormControl("")
    });*/
  }

  ngAfterViewInit() {
    const instance = this;
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
        endpoint: 'https://' + instance.bucketName + '.s3.amazonaws.com/',
        accessKey: 'AKIA4UZ6KTWAYO3ICQM5',
        params: {'Cache-Control': 'private, max-age=31536000, must-revalidate'}
      },
      signature: {
        // todo: use a global env property for this
        endpoint: 'http://localhost:1234/aws/awsSignPostRequest/',
        version: 4,
        params: {
          drift: ((new Date().getTimezoneOffset() * 60 * 2) * 1000) - Date.now()
        }
      },
      // todo: Check what does this property do
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
        key: function (fileId) {
          return 'recipes/' + this.getUuid(fileId);
        }
      },
      callbacks: {
        onSubmit: function (id, fileName) {
          console.log('selected file:', fileName);
        },
        // onSubmitted: function(id, name) { alert('onSubmitted');},
        onComplete: function (id, name, responseJSON, maybeXhr) {
          if (responseJSON.success) {
            console.log('upload complete', name);
            const uploadUrl = 'https://' + instance.bucketName + '.s3.amazonaws.com/' + this.getKey(id);
            console.log('uploaded image url', uploadUrl);
            instance.itemForm.controls['itemMainImage'].setValue(uploadUrl);
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

  private get productList() {
    return this.itemForm.get('productList') as FormArray;
  }

  private get instructions() {
    return this.itemForm.get('instructions') as FormArray;
  }

  // todo: check what validations apply for the controls in these two methods
  private addNewInstruction(): void {
    const instruction = new FormGroup({
      instructionOrder: new FormControl({value: this.instructions.length + 1, disabled: true}),
      instructionText: new FormControl('')
    });
    this.instructions.push(instruction);
  }

  private addNewProduct(): void {
    const product = new FormGroup({
      productName: new FormControl(''),
      productMeasurement: new FormControl(''),
      productUnit: new FormControl('')
    });
    this.productList.push(product);
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

  onSubmit() {
    // todo: load creator from database
    const creator = new Creator();
    // tslint:disable-next-line:max-line-length
    creator.image = 'https://media.aweita.larepublica.pe/678x508/aweita/imagen/2018/02/08/noticia-por-que-krilin-tiene-6-puntos-en-la-frente-y-no-tiene-nariz-portada.jpg';
    creator.name = 'Harol Melgar';
    creator.userId = '5c966dd8a33edd0509aea042';
    const item = this.itemForm.getRawValue() as Item;
    item.creator = creator;
    this.service.addItem(item).subscribe((response) => {
      console.log(response);
      // todo redirect to the customer profile
    });
  }
}

