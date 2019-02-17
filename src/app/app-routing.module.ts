import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CommonModule } from '@angular/common';
import {ItemsListComponent}      from './items-list/items-list.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ItemsListComponent },
  { path: 'item-detail', component: ItemDetailComponent }
];

@NgModule({
imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})



export class AppRoutingModule { }
