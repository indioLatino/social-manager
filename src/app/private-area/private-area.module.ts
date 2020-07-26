import {ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemEditorComponent} from './item-editor/item-editor.component';
import {RouterModule, Routes} from '@angular/router';
import {PersonalSpaceComponent} from './personal-space/personal-space.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ItemsModule} from '../items/items.module';
import {UserService} from '../common/service/user.service';

const routesPrivateArea: Routes = [
  {
    path: 'account',
    component: PersonalSpaceComponent
  },
  {
    path: 'account/:userId',
    component: PersonalSpaceComponent
  },
  {
    path: 'editor/:itemId',
    component: ItemEditorComponent
  },
  {
    path: 'editor',
    component: ItemEditorComponent
  }
];

@NgModule({
  declarations: [ItemEditorComponent, PersonalSpaceComponent],
  imports: [
    CommonModule,
    ItemsModule,
    ReactiveFormsModule,
    TabsModule,
    RouterModule.forChild(routesPrivateArea),
    MDBBootstrapModule.forRoot(),
    TranslateModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PrivateAreaModule {
}
