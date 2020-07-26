import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from './common/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'social-manager';

  constructor(private translate: TranslateService, private userService: UserService) {
    this.translate.setDefaultLang('en-GB');
    this.userService.initializeSession();
  }

  ngOnInit(): void {
  }
}
