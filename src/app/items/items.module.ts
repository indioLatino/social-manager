import {ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsListComponent} from './items-list/items-list.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {NoteBookComponent} from './note-book/note-book.component';
import {InstructionListComponent} from './instruction-list/instruction-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CreatorComponent} from './creator/creator.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProductListComponent} from './product-list/product-list/product-list.component';
import {WavesModule, TableModule} from 'angular-bootstrap-md';
// RECOMMENDED
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PricingComponent} from '../pricing/pricing/pricing.component';
import {UserService} from '../common/service/user.service';

const routes: Routes = [
  {
    path: 'list',
    component: ItemsListComponent
  },
  {
    path: 'list/:loggedAuthorId',
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
    RouterModule.forChild(routes),
    AccordionModule,
    TabsModule,
    TranslateModule,
    TableModule,
    WavesModule
  ],
  declarations: [
    PricingComponent,
    NoteBookComponent,
    InstructionListComponent,
    ItemsListComponent,
    ItemDetailComponent,
    CreatorComponent,
    ProductListComponent
  ],
  exports: [
    ItemsListComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class ItemsModule {
}
