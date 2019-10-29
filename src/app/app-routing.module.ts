import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import {ListingComponent} from './listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesComponent,
    children: [
      { path: '', component: ListingComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
