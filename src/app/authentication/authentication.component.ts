import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Injectable, OnInit, SecurityContext} from '@angular/core';
import {UserService} from '../common/service/user.service';
import {CognitoUserSession} from 'amazon-cognito-identity-js';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements OnInit {

  private area: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.area = this.activatedRoute.snapshot.paramMap.get('area');
  }

  ngOnInit(): void {
    this.area = this.activatedRoute.snapshot.paramMap.get('area');
  }

  private buildUrl(): SafeResourceUrl {
    const a = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:4201/${this.area}`);
    return a;
    // this.changeDetectorRef.markForCheck();
  }

  @HostListener('window:message', ['$event'])
  public receiveMessage(event) {
    // todo: check the domain that sends the message and discart the message if it comes from an untrusted domain
    if (event.origin === 'http://localhost:4201') {
      console.log(event.data);
      if (event.data.signInUserSession) {
        this.userService.updateSession(event.data.signInUserSession.accessToken.jwtToken);
        this.router.navigate(['']);
      }
      if (event.data.message === 'register success') {
        alert('Registered succesfully! Check your inbox to confirm your email address');
        this.router.navigate(['']);
      }
    }
  }
}

/*import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';*/

/*@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }
}*/
