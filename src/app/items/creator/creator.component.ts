import {Component, Input, OnInit} from '@angular/core';
import {Creator} from "../../model/creator";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  @Input()
  creator: Creator;

  constructor() { }

  ngOnInit() {
  }

}
