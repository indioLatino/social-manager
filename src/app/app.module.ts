import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: '/item', pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'item',
        loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
      }
    ]
  },
  {  path: '**', redirectTo: '/item' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  // exports: [ RouterModule ]
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
