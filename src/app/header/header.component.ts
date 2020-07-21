import {Component, OnInit} from '@angular/core';
import {UserService} from '../common/service/user.service';
import {FoodieUser} from '../model/foodie-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private foodieUser: FoodieUser;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.userData.subscribe((user: FoodieUser) => {
      this.foodieUser = user;
    });
  }
}
