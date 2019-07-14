import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import {NoteBookComponent} from "./note-book/note-book.component";
import {InstructionListComponent} from "./instruction-list/instruction-list.component";
import {ItemsRoutingModule} from "./items-routing.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: ItemsListComponent
  },
  {
    path: 'detail/:id',
    component: ItemDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NoteBookComponent,
    InstructionListComponent,
    ItemsListComponent,
    ItemDetailComponent
  ]
})
export class ItemsModule { }
