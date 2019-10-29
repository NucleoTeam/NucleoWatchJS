import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';
import { MessagesComponent } from './messages/messages.component';
import {ExecutionsService} from './executions.service';
import { ListingComponent } from './listing/listing.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenuComponent } from './menu/menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ListitemComponent } from './listitem/listitem.component';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { StepdetailsComponent } from './stepdetails/stepdetails.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ListingComponent,
    MenuComponent,
    ListitemComponent,
    ItemdetailsComponent,
    StepdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSliderModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxJsonViewerModule
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    ExecutionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
