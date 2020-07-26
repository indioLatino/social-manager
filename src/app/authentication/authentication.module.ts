import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {UserService} from '../common/service/user.service';

const routes: Routes = [
  {
    path: ':area',
    component: AuthenticationComponent
  },
  {
    path: 'register',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AuthenticationModule {
}
