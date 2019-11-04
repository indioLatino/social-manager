import { Component, OnInit } from '@angular/core';
import {UploadService} from "../../common/service/upload.service";
import { s3 } from 'fine-uploader/lib/core/s3';


@Component({
  selector: 'app-item-editor',
  templateUrl: './item-editor.component.html',
  styleUrls: ['./item-editor.component.css']
})
export class ItemEditorComponent implements OnInit {

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

  bucketName = 'foodieapi';

  uploader: any;

  constructor(private imageUploadService: UploadService) { }

  ngOnInit() {
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
      region: 'eu-west-1',
      request: {
        endpoint: 'https://' + instance.bucketName  +'.s3.amazonaws.com/',
        accessKey: 'AKIA4UZ6KTWAYO3ICQM5',
        params: { 'Cache-Control': 'private, max-age=31536000, must-revalidate' }
      },
      signature: {
        endpoint: 'http://localhost:1234/fileUploader/uploadFileToS3/',
      },
      iframeSupport: {
        localBlankPagePath: '/somepage.html'
      },
      cors: {
        expected: true,
        sendCredentials: true
      },
      objectProperties: {
        acl: 'public-read',
      },
      callbacks: {
        onSubmit: function (id, fileName) {
          console.log('selected file:', fileName);
        },
        // onSubmitted: function(id, name) { alert('onSubmitted');},
        onComplete: function (id, name, responseJSON, maybeXhr) {
          if(responseJSON.success) {
            console.log('upload complete', name);
            console.log('uploaded image url', 'https://' + instance.bucketName + '.s3.amazonaws.com/' + this.getKey(id));
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

}
