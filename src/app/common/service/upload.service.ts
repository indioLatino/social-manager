import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  //todo: Use environment variable instead
  readonly endpoint = 'http://localhost:1234/fileUploader/uploadFileToS3';
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  imageUpload(imageForm: FormData) {
    console.log(imageForm)
    console.log('image uploading');
    return this.http.post(this.endpoint,
      imageForm);
  }
}
