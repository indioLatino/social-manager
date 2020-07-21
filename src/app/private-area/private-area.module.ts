import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditorComponent } from './item-editor/item-editor.component';
import {RouterModule, Routes} from "@angular/router";
import { PersonalSpaceComponent } from './personal-space/personal-space.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {TranslateModule} from "@ngx-translate/core";
import { ReactiveFormsModule } from '@angular/forms';
import {TabsModule} from "ngx-bootstrap/tabs";

const routes: Routes = [
  {
    path: '',
    component: PersonalSpaceComponent
  },
  {
    path: 'editor/:id',
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
    ReactiveFormsModule,
    TabsModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot(),
    TranslateModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PrivateAreaModule { }
