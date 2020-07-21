import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FoodieRestService} from '../../common/service/foodie-rest.service';
import {UserService} from '../../common/service/user.service';
import {s3} from 'fine-uploader/lib/core/s3';
import {FoodieUser} from '../../model/foodie-user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.css']
})
export class PersonalSpaceComponent implements OnInit {

  loggedUser: FoodieUser;
  uploader: any;
  userForm: FormGroup;
  // todo: make it a property
  formImage = 'https://foodieapi.s3.amazonaws.com/recipes/f5fcadb4-53fd-4795-ac4d-47f2af45fb97';
  // todo: make it a property
  bucketName = 'foodieapi';

  constructor(private formBuilder: FormBuilder, private foodieService: FoodieRestService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.buildFormUser();
    this.userService.userData.subscribe((user) => {
      this.loggedUser = user;
      this.formImage = this.loggedUser.userProfilePicture ? this.loggedUser.userProfilePicture : this.formImage;
      this.initFormUserValues();
    });
  }

  ngAfterViewInit() {
    const instance = this;
    // TODO: Remove this logic to its own file
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
            instance.userForm.controls['userProfilePicture'].setValue(uploadUrl);
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

  private initFormUserValues() {
    this.userForm.get('_id').setValue(this.loggedUser._id);
    this.userForm.get('userName').setValue(this.loggedUser.userName);
    this.userForm.get('userLastName').setValue(this.loggedUser.userLastName);
    this.userForm.get('userNickname').setValue(this.loggedUser.userNickname);
    this.userForm.get('userEmail').setValue(this.loggedUser.userEmail);
    this.userForm.get('userProfilePicture').setValue(this.loggedUser.userProfilePicture);
    this.userForm.get('userRegistrationDate').setValue(this.loggedUser.userRegistrationDate);
    this.userForm.get('userPostsNumber').setValue(this.loggedUser.userPostsNumber);
    this.userForm.get('userGender').setValue(this.loggedUser.userGender);
  }

  private onSubmit() {
    const updatedUser = this.userForm.getRawValue();
    this.userService.updateFoodieUser(updatedUser).subscribe((response) => {
      /* if (response.status === 200) {*/
      this.router.navigate(['']);
      /* }*/
    });
  }

  private buildFormUser(): void {
    this.userForm = this.formBuilder.group({
      _id: ['', Validators.required],
      userName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userNickname: ['', []],
      userEmail: ['', Validators.required],
      userProfilePicture: ['', Validators.required],
      userRegistrationDate: ['', []],
      userPostsNumber: ['', []],
      userGender: ['', Validators.required]
    });
  }

}
