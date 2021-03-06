import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HeaderComponent} from './header/header.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from "@angular/router";
import {ItemsModule} from "./items/items.module";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {TabsModule} from "ngx-bootstrap";
import { PricingComponent } from './pricing/pricing/pricing.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {path: '', redirectTo: '/item', pathMatch: 'full'},
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
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'private',
        loadChildren: () => import('./private-area/private-area.module').then(m => m.PrivateAreaModule)
      }
    ]
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {path: '**', redirectTo: '/item'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationComponent
  ],
  imports: [
    ItemsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(routes),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
