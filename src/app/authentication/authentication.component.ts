import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    //
    window.addEventListener('message', this.receiveMessage, false);

  }

  //@HostListener('window:message', ['$event'])
  public receiveMessage(event) {
    // todo: check the domain that sends the message and discart the message if it comes from an untrusted domain
    /*if (event.origin !== "http://example.org:8080")*/
    console.log(event);
  }
}
