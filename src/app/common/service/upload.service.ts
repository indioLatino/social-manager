import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {s3} from 'fine-uploader/lib/core/s3';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // todo: Use environment variable instead
  /*readonly endpoint = 'http://localhost:1234/aws/awsSignPostRequest';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };*/

  constructor(private http: HttpClient) {
  }

  getUploader(instance, resourceFormName: string, form: FormGroup) {
    return new s3.FineUploaderBasic({
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
            form.controls[resourceFormName].setValue(uploadUrl);
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
}
