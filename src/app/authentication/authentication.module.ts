import {RouterModule, Routes} from '@angular/router';
import {PersonalSpaceComponent} from '../private-area/personal-space/personal-space.component';
import {ItemEditorComponent} from '../private-area/item-editor/item-editor.component';
import {AuthenticationComponent} from './authentication.component';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'register',
    component: AuthenticationComponent
  }
];

@NgModule({
  declarations: [ItemEditorComponent, PersonalSpaceComponent],
  imports: [
    RouterModule.forChild(routes)
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AuthenticationModule {
}
